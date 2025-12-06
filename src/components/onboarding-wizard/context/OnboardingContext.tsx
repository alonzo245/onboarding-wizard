import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  type Address,
  type BusinessDetails,
  type CountriesState,
  type OnboardingData,
  type PersonalDetails,
} from "../types/types";
import { submitApplication } from "../../../../mocks/api";
import { toast } from "react-toastify";
import { useCountriesQuery } from "../queries/queries";
import {
  defaultData,
  loadInitialState,
  STORAGE_KEY,
  SUBMITTED_DATA_KEY,
  type PersistedState,
} from "../config/config";

type Ctx = {
  data: OnboardingData;
  setEmail: (email: string) => void;
  setPersonal: (changes: Partial<PersonalDetails>) => void;
  setHomeAddress: (changes: Partial<Address>) => void;
  setBusiness: (changes: Partial<BusinessDetails>) => void;
  setOwnerAddress: (changes: Partial<Address>) => void;
  countries: CountriesState;
  submit: () => Promise<{ ok: boolean; error?: string }>;
  furthestStep: number;
  setFurthestStep: (n: number) => void;
};

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

  const countriesQuery = useCountriesQuery();

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

  const submit = async () => {
    try {
      await submitApplication(data);
      toast("Check the console log for submitted payload", {
        autoClose: 3000,
        delay: 1000,
      });
      try {
        if (typeof localStorage !== "undefined") {
          localStorage.setItem(SUBMITTED_DATA_KEY, JSON.stringify(data));
          localStorage.removeItem(STORAGE_KEY);
        }
      } catch {}
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
      submit,
      furthestStep,
      setFurthestStep,
    }),
    [data, countriesState, furthestStep]
  );

  useEffect(() => {
    try {
      if (typeof localStorage !== "undefined") {
        const toPersist: PersistedState = { data, furthestStep };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(toPersist));
      }
    } catch {}
  }, [data, furthestStep]);

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
