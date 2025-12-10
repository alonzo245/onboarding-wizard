import { useState } from "react";
import { ZodError } from "zod";
import {
  emailStepValidation,
  personalDetailsStepValidation,
  homeAddressStepValidation,
  financialDetailsStepValidation,
} from "../validation/schemas";
import {
  STEP_EMAIL,
  STEP_PERSONAL_DETAILS,
  STEP_HOME_ADDRESS,
  STEP_FINANCIAL_DETAILS,
  STEP_REVIEW,
  STEP_THANK_YOU,
  type StepKey,
} from "../constants";
import { useErrorsStore } from "../store/errorsStore";
import { submitOnboardingData } from "../queries/submitOnboarding";
import { stepsConfig } from "../config/stepsConfig";
import {
  EmailStepData,
  PersonalDetailsStepData,
  HomeAddressStepData,
  FinancialDetailsStepData,
} from "../types";
import { STORAGE_KEY } from "./useOnboardingPersistence";

interface UseOnboardingSubmitProps {
  step: StepKey;
  setStep: (step: StepKey) => void;
  emailStepData: React.MutableRefObject<EmailStepData>;
  personalDetailsStepData: React.MutableRefObject<PersonalDetailsStepData>;
  homeAddressStepData: React.MutableRefObject<HomeAddressStepData>;
  financialDetailsStepData: React.MutableRefObject<FinancialDetailsStepData>;
}

export function useOnboardingSubmit({
  step,
  setStep,
  emailStepData,
  personalDetailsStepData,
  homeAddressStepData,
  financialDetailsStepData,
}: UseOnboardingSubmitProps) {
  const { setZodError, clearErrors } = useErrorsStore();
  const [resetKey, setResetKey] = useState(0);

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());

    try {
      if (step === STEP_EMAIL) {
        const validatedData = emailStepValidation.parse({ email: data.email });
        if (validatedData) {
          clearErrors();
          emailStepData.current = validatedData;
          setStep(STEP_PERSONAL_DETAILS);
        }
        return;
      } else if (step === STEP_PERSONAL_DETAILS) {
        const validatedData = personalDetailsStepValidation.parse({
          firstName: data.firstName,
          lastName: data.lastName,
          dateOfBirth: data.dateOfBirth,
        });
        if (validatedData) {
          clearErrors();
          personalDetailsStepData.current = validatedData;
          setStep(STEP_HOME_ADDRESS);
        }
        return;
      } else if (step === STEP_HOME_ADDRESS) {
        const validatedData = homeAddressStepValidation.parse({
          addressLine1: data.addressLine1,
          addressLine2: data.addressLine2 || undefined,
          city: data.city,
          state: data.state,
          zip: data.zip,
        });
        if (validatedData) {
          homeAddressStepData.current = validatedData;
          setStep(STEP_FINANCIAL_DETAILS);
        }
        return;
      } else if (step === STEP_FINANCIAL_DETAILS) {
        const validatedData = financialDetailsStepValidation.parse({
          income: data.income,
          expenses: data.expenses,
          assets: data.assets,
          liabilities: data.liabilities,
          netWorth: data.netWorth,
        });
        if (validatedData) {
          financialDetailsStepData.current = validatedData;
          setStep(STEP_REVIEW);
        }
        return;
      } else if (step === STEP_REVIEW) {
        if (Math.random() >= 0.5) {
          await submitOnboardingData({
            ...emailStepData.current,
            ...personalDetailsStepData.current,
            ...homeAddressStepData.current,
            ...financialDetailsStepData.current,
          });
        }

        clearErrors();
        emailStepData.current = { ...stepsConfig.email };
        personalDetailsStepData.current = { ...stepsConfig.personalDetails };
        homeAddressStepData.current = { ...stepsConfig.homeAddress };
        financialDetailsStepData.current = { ...stepsConfig.financialDetails };
        setResetKey((prev) => prev + 1);
        setStep(STEP_THANK_YOU);
        // remove all data fr
        localStorage.removeItem(STORAGE_KEY);
      }
    } catch (error) {
      console.error(error);
      if (error instanceof ZodError) {
        setZodError(error);
      }
    }
  };

  return { handleOnSubmit, resetKey };
}
