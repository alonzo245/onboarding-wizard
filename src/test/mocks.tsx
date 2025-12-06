import { vi } from "vitest";
import type { OnboardingData, CountriesState } from "../components/onboarding-wizard/types/types";

export const mockOnboardingData: OnboardingData = {
  email: "",
  personal: {
    firstName: "",
    lastName: "",
    dateOfBirth: "",
  },
  homeAddress: {
    countryCode: "",
    city: "",
    street: "",
    houseNumber: "",
    postalCode: "",
  },
  business: {
    businessName: "",
    incorporationDate: "",
    ownerAddress: {
      countryCode: "",
      city: "",
      street: "",
      houseNumber: "",
      postalCode: "",
    },
  },
};

export const mockCountriesState: CountriesState = {
  countries: [
    {
      name: "United States",
      code: "US",
      postalCodeRegex: "^\\d{5}(-\\d{4})?$",
      cities: ["New York", "Los Angeles", "Chicago"],
    },
    {
      name: "Canada",
      code: "CA",
      postalCodeRegex: "^[A-Z]\\d[A-Z] \\d[A-Z]\\d$",
      cities: ["Toronto", "Vancouver", "Montreal"],
    },
  ],
  loading: false,
  error: null,
};

export const createMockContext = (overrides: Partial<OnboardingData> = {}) => {
  const data = { ...mockOnboardingData, ...overrides };
  return {
    data,
    setEmail: vi.fn(),
    setPersonal: vi.fn(),
    setHomeAddress: vi.fn(),
    setBusiness: vi.fn(),
    setOwnerAddress: vi.fn(),
    countries: mockCountriesState,
    tryPrefillFromEmail: vi.fn().mockResolvedValue(false),
    submit: vi.fn().mockResolvedValue({ ok: true }),
    furthestStep: 0,
    setFurthestStep: vi.fn(),
  };
};

