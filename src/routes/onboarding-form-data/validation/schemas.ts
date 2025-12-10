// zod each
import { z } from "zod";

export const emailStepValidation = z.object({
  email: z.string().email("Invalid email address"),
});

export const personalDetailsStepValidation = z.object({
  firstName: z
    .string()
    .min(1, "First name is required")
    .regex(/^[a-zA-Z]+$/, "First name must contain only letters"),
  lastName: z
    .string()
    .min(1, "Last name is required")
    .regex(/^[a-zA-Z]+$/, "Last name must contain only letters"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
});

export const homeAddressStepValidation = z.object({
  addressLine1: z.string().min(1, "Address line 1 is required"),
  addressLine2: z.string().optional(),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  zip: z
    .string()
    .min(5, "ZIP code must be at least 5 characters")
    .regex(/^\d{5}(-\d{4})?$/, "Invalid ZIP code format"),
});

const numberString = (label: string) =>
  z
    .string()
    .min(1, `${label} is required`)
    .regex(/^-?\d+(\.\d+)?$/, `${label} must be a valid number`);

export const financialDetailsStepValidation = z.object({
  income: numberString("Income"),
  expenses: numberString("Expenses"),
  assets: numberString("Assets"),
  liabilities: numberString("Liabilities"),
  netWorth: numberString("Net worth"),
});
