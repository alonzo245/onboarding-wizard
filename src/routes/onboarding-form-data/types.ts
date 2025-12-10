export interface EmailStepData {
  email: string;
}

export interface PersonalDetailsStepData {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
}

export interface HomeAddressStepData {
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  zip: string;
}

export interface FinancialDetailsStepData {
  income: string;
  expenses: string;
  assets: string;
  liabilities: string;
  netWorth: string;
}
