import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  type Address,
  type BusinessDetails,
  type CountriesState,
  type Country,
  type OnboardingData,
  type PersonalDetails,
} from "./types";
import {
  fetchCountries,
  fetchUserByEmail,
  submitApplication,
} from "../../../mocks/api";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

type Ctx = {
  data: OnboardingData;
  setEmail: (email: string) => void;
  setPersonal: (changes: Partial<PersonalDetails>) => void;
  setHomeAddress: (changes: Partial<Address>) => void;
  setBusiness: (changes: Partial<BusinessDetails>) => void;
  setOwnerAddress: (changes: Partial<Address>) => void;
  countries: CountriesState;
  tryPrefillFromEmail: (email: string) => Promise<boolean>;
  submit: () => Promise<{ ok: boolean; error?: string }>;
  furthestStep: number;
  setFurthestStep: (n: number) => void;
};

const defaultAddress: Address = {
  countryCode: "",
  city: "",
  street: "",
  houseNumber: "",
  postalCode: "",
};

const defaultData: OnboardingData = {
  email: "",
  personal: {
    firstName: "",
    lastName: "",
    dateOfBirth: "",
  },
  homeAddress: { ...defaultAddress },
  business: {
    businessName: "",
    incorporationDate: "",
    ownerAddress: { ...defaultAddress },
  },
};

const STORAGE_KEY = "onboarding_data_v1";
const SUBMITTED_DATA_KEY = "onboarding_submitted_data_v1";

type PersistedState = { data: OnboardingData; furthestStep: number };

function loadInitialState(): PersistedState {
  try {
    const raw =
      typeof localStorage !== "undefined"
        ? localStorage.getItem(STORAGE_KEY)
        : null;
    if (!raw) return { data: { ...defaultData }, furthestStep: 0 };
    const parsed = JSON.parse(raw) as any;
    const parsedData: Partial<OnboardingData> =
      parsed && parsed.data ? parsed.data : parsed;
    const mergedData: OnboardingData = {
      ...defaultData,
      ...parsedData,
      personal: { ...defaultData.personal, ...(parsedData.personal ?? {}) },
      homeAddress: { ...defaultAddress, ...(parsedData.homeAddress ?? {}) },
      business: {
        ...defaultData.business,
        ...(parsedData.business ?? {}),
        ownerAddress: {
          ...defaultAddress,
          ...(parsedData.business && parsedData.business.ownerAddress
            ? parsedData.business.ownerAddress
            : {}),
        },
      },
    };
    const furthestStep: number =
      parsed && typeof parsed.furthestStep === "number"
        ? parsed.furthestStep
        : 0;
    return { data: mergedData, furthestStep };
  } catch {
    return { data: { ...defaultData }, furthestStep: 0 };
  }
}

const OnboardingCtx = createContext<Ctx | null>(null);

export function OnboardingProvider({
  children,
}: {
  children: import("react").ReactNode;
}) {
  const initial = loadInitialState();
  const [data, setData] = useState<OnboardingData>(() => initial.data);
  const [furthestStep, setFurthestStep] = useState<number>(
    () => initial.furthestStep
  );
  useEffect(() => {
    try {
      if (typeof localStorage !== "undefined") {
        const toPersist: PersistedState = { data, furthestStep };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(toPersist));
      }
    } catch {
      // ignore storage errors
    }
  }, [data, furthestStep]);
  const countriesQuery = useQuery({
    queryKey: ["countries"],
    queryFn: fetchCountries,
    select: (raw: unknown): Country[] =>
      Array.isArray(raw)
        ? raw.map((r: any) => ({
            name: String(r?.name ?? ""),
            code: String(r?.code ?? ""),
            postalCodeRegex: String(r?.postalCodeRegex ?? ".*"),
            cities: Array.isArray(r?.cities)
              ? r.cities.map((c: any) => String(c))
              : [],
          }))
        : [],
    staleTime: 10 * 60 * 1000,
  });
  const countriesState: CountriesState = useMemo(() => {
    return {
      countries: countriesQuery.data ?? [],
      loading: countriesQuery.isLoading,
      error: countriesQuery.isError
        ? (countriesQuery.error as Error)?.message ?? "Failed to load countries"
        : null,
    };
  }, [
    countriesQuery.data,
    countriesQuery.isLoading,
    countriesQuery.isError,
    countriesQuery.error,
  ]);

  const setEmail = (email: string) => {
    setData((prev) => ({ ...prev, email }));
  };
  const setPersonal = (changes: Partial<PersonalDetails>) => {
    setData((prev) => ({
      ...prev,
      personal: { ...prev.personal, ...changes },
    }));
  };
  const setHomeAddress = (changes: Partial<Address>) => {
    setData((prev) => ({
      ...prev,
      homeAddress: { ...prev.homeAddress, ...changes },
    }));
  };
  const setBusiness = (changes: Partial<BusinessDetails>) => {
    setData((prev) => ({
      ...prev,
      business: {
        ...prev.business,
        ...changes,
        ownerAddress: { ...prev.business.ownerAddress },
      },
    }));
  };
  const setOwnerAddress = (changes: Partial<Address>) => {
    setData((prev) => ({
      ...prev,
      business: {
        ...prev.business,
        ownerAddress: { ...prev.business.ownerAddress, ...changes },
      },
    }));
  };

  const tryPrefillFromEmail = async (email: string): Promise<boolean> => {
    try {
      const result = await fetchUserByEmail(email);
      if (!result || typeof result !== "object") return false;
      const obj = result as Record<string, unknown>;
      // extract case-insensitively
      const pickStringCI = (keys: string[]): string | undefined => {
        const key = Object.keys(obj).find((k) =>
          keys.some((t) => t.toLowerCase() === k.toLowerCase())
        );
        const v = key ? obj[key] : undefined;
        return typeof v === "string" ? v : undefined;
      };
      const firstName = pickStringCI(["firstName", "first_name", "firstname"]);
      const lastName = pickStringCI(["lastName", "last_name", "lastname"]);
      const businessName = pickStringCI([
        "businessName",
        "BusinessName",
        "business_name",
      ]);
      const found = Boolean(firstName || lastName || businessName);
      setData((prev) => ({
        ...prev,
        email: email,
        personal: {
          ...prev.personal,
          firstName: firstName ?? prev.personal.firstName,
          lastName: lastName ?? prev.personal.lastName,
        },
        business: {
          ...prev.business,
          businessName: businessName ?? prev.business.businessName,
          ownerAddress: { ...prev.business.ownerAddress },
        },
      }));
      return found;
    } catch {
      return false;
    }
  };

  const submit = async () => {
    try {
      await submitApplication(data);
      try {
        if (typeof localStorage !== "undefined") {
          localStorage.setItem(SUBMITTED_DATA_KEY, JSON.stringify(data));
          localStorage.removeItem(STORAGE_KEY);
        }
      } catch {
        // ignore storage errors
      }
      // Reset context state to initial empty values
      setData({ ...defaultData });
      setFurthestStep(0);
      return { ok: true as const };
    } catch (e: any) {
      const errorMsg = e?.message ?? "Submission failed";
      toast.error(errorMsg);
      return { ok: false as const, error: errorMsg };
    }
  };

  const value = useMemo<Ctx>(
    () => ({
      data,
      setEmail,
      setPersonal,
      setHomeAddress,
      setBusiness,
      setOwnerAddress,
      countries: countriesState,
      tryPrefillFromEmail,
      submit,
      furthestStep,
      setFurthestStep,
    }),
    [data, countriesState, furthestStep]
  );

  return (
    <OnboardingCtx.Provider value={value}>{children}</OnboardingCtx.Provider>
  );
}

export function useOnboarding() {
  const ctx = useContext(OnboardingCtx);
  if (!ctx)
    throw new Error("useOnboarding must be used within OnboardingProvider");
  return ctx;
}
