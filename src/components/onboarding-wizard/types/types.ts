export type Country = {
  name: string;
  code: string;
  postalCodeRegex: string;
  cities: string[];
};

export type Address = {
  countryCode: string;
  city: string;
  street: string;
  houseNumber: string;
  postalCode: string;
};

export type PersonalDetails = {
  firstName: string;
  lastName: string;
  dateOfBirth: string; // ISO date (YYYY-MM-DD)
};

export type BusinessDetails = {
  businessName: string;
  incorporationDate: string; // ISO date (YYYY-MM-DD)
  ownerAddress: Address;
};

export type OnboardingData = {
  email: string;
  personal: PersonalDetails;
  homeAddress: Address;
  business: BusinessDetails;
};

export type CountriesState = {
  countries: Country[];
  loading: boolean;
  error: string | null;
};
