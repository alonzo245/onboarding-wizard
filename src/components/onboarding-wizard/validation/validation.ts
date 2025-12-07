import { z } from "zod";
import { Country, OnboardingData } from "../types/types";

// Base field schemas
const nonEmptyString = z.string().trim().min(1);
const emailSchema = z
  .string()
  .trim()
  .min(1, "Email is required")
  .email("Enter a valid email");
const isoDateSchema = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "Enter a valid date")
  .refine((value: string) => {
    const d = new Date(value);
    return !isNaN(d.getTime());
  }, "Enter a valid date");

function makeAddressSchema(countries: Country[]) {
  return z
    .object({
      countryCode: z.string().trim().min(1, "Country is required"),
      city: z.string().trim().min(1, "City is required"),
      street: z.string().trim().min(1, "Street is required"),
      houseNumber: z
        .string()
        .trim()
        .min(1, "House number is required")
        .regex(/^\d+$/, "House number must contain only numbers"),
      postalCode: z
        .string()
        .trim()
        .min(1, "Postal code is required")
        .regex(/^\d+$/, "Postal code must contain only numbers"),
    })
    .superRefine(
      (
        val: {
          countryCode: string;
          city: string;
          street: string;
          houseNumber: string;
          postalCode: string;
        },
        ctx: { addIssue: (issue: any) => void }
      ) => {
        const country = countries.find((c) => c.code === val.countryCode);
        if (!country) {
          // If country is unknown, only require non-empty (already enforced)
          return;
        }
      }
    );
}

function makePersonalSchema() {
  return z.object({
    firstName: z
      .string()
      .trim()
      .min(1, "First name is required")
      .regex(/^[a-zA-Z]+$/, "First name must contain only letters"),
    lastName: z
      .string()
      .trim()
      .min(1, "Last name is required")
      .regex(/^[a-zA-Z]+$/, "Last name must contain only letters"),
    dateOfBirth: isoDateSchema,
  });
}

function makeBusinessSchema(countries: Country[]) {
  return z.object({
    businessName: z.string().trim().min(1, "Business name is required"),
    incorporationDate: isoDateSchema,
    ownerAddress: makeAddressSchema(countries),
  });
}

// Compatibility helpers (now powered by zod)
export function isEmailValid(email: string): boolean {
  return emailSchema.safeParse(email).success;
}

export function isNonEmpty(value: string): boolean {
  return nonEmptyString.safeParse(value).success;
}

export function isIsoDate(value: string): boolean {
  return isoDateSchema.safeParse(value).success;
}

export function validatePostalCode(
  country: Country | undefined,
  code: string
): boolean {
  if (!country) return isNonEmpty(code);
  try {
    const re = new RegExp(country.postalCodeRegex);
    return re.test(code.trim());
  } catch {
    return isNonEmpty(code);
  }
}

// Public API used by pages
export function validateStepEmail(email: string): string | null {
  const res = emailSchema.safeParse(email);
  if (res.success) return null;
  const issue = res.error.issues[0];
  return issue?.message ?? "Enter a valid email";
}

export function validateStepPersonal(
  data: OnboardingData["personal"]
): Record<string, string> {
  const schema = makePersonalSchema();
  const result = schema.safeParse(data);
  if (result.success) return {};
  const errors: Record<string, string> = {};
  for (const issue of result.error.issues) {
    const key = String(issue.path[0] ?? "");
    if (key && !errors[key]) errors[key] = issue.message;
  }
  return errors;
}

export function validateStepAddress(
  address: OnboardingData["homeAddress"],
  countries: Country[]
): Record<string, string> {
  const schema = makeAddressSchema(countries);
  const result = schema.safeParse(address);
  if (result.success) return {};
  const errors: Record<string, string> = {};
  for (const issue of result.error.issues) {
    const key = String(issue.path[0] ?? "");
    if (key && !errors[key]) errors[key] = issue.message;
  }
  return errors;
}

export function validateStepBusiness(
  business: OnboardingData["business"],
  countries: Country[]
): Record<string, string> {
  const schema = makeBusinessSchema(countries);
  const result = schema.safeParse(business);
  if (result.success) return {};
  const errors: Record<string, string> = {};
  for (const issue of result.error.issues) {
    const path = issue.path.join(".");
    const key = path || "";
    if (key && !errors[key]) errors[key] = issue.message;
  }
  return errors;
}
