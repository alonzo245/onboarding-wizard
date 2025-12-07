import type { Address, OnboardingData } from "../types/types";

export const defaultAddress: Address = {
  countryCode: "",
  city: "",
  street: "",
  houseNumber: "",
  postalCode: "",
};

export const defaultData: OnboardingData = {
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

export const STORAGE_KEY = "onboarding_data_v1";
export const SUBMITTED_DATA_KEY = "onboarding_submitted_data_v1";

export type PersistedState = { data: OnboardingData; furthestStep: number };

export function loadInitialState(): PersistedState {
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
