export const STEP_EMAIL = "email" as const;
export const STEP_PERSONAL_DETAILS = "personalDetails" as const;
export const STEP_HOME_ADDRESS = "homeAddress" as const;
export const STEP_FINANCIAL_DETAILS = "financialDetails" as const;
export const STEP_REVIEW = "review" as const;
export const STEP_THANK_YOU = "thankYou" as const;

export type StepKey =
  | typeof STEP_EMAIL
  | typeof STEP_PERSONAL_DETAILS
  | typeof STEP_HOME_ADDRESS
  | typeof STEP_FINANCIAL_DETAILS
  | typeof STEP_REVIEW
  | typeof STEP_THANK_YOU;

export const STEP_MODE_CREATE = "create" as const;
export const STEP_MODE_EDIT = "edit" as const;
export const STEP_MODE_DUPLICATE = "duplicate" as const;

export type StepMode = typeof STEP_MODE_CREATE | typeof STEP_MODE_EDIT;
