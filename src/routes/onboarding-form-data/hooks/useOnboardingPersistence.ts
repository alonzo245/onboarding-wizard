import { useEffect, useRef } from "react";
import {
  STEP_EMAIL,
  STEP_PERSONAL_DETAILS,
  STEP_HOME_ADDRESS,
  STEP_FINANCIAL_DETAILS,
  STEP_REVIEW,
  STEP_THANK_YOU,
  type StepKey,
} from "../constants";
import {
  EmailStepData,
  PersonalDetailsStepData,
  HomeAddressStepData,
  FinancialDetailsStepData,
} from "../types";
import { toast } from "react-toastify";

export const STORAGE_KEY = "onboarding-form-data";
const allowedSteps: StepKey[] = [
  STEP_EMAIL,
  STEP_PERSONAL_DETAILS,
  STEP_HOME_ADDRESS,
  STEP_FINANCIAL_DETAILS,
  STEP_REVIEW,
  STEP_THANK_YOU,
];

interface UseOnboardingPersistenceProps {
  step: StepKey;
  setStep: (step: StepKey) => void;
  stepParam?: string;
  basePath: string;
  navigate: (path: string, opts?: { replace?: boolean }) => void;
  emailStepData: React.MutableRefObject<EmailStepData>;
  personalDetailsStepData: React.MutableRefObject<PersonalDetailsStepData>;
  homeAddressStepData: React.MutableRefObject<HomeAddressStepData>;
  financialDetailsStepData: React.MutableRefObject<FinancialDetailsStepData>;
}

export function useOnboardingPersistence({
  step,
  setStep,
  stepParam,
  basePath,
  navigate,
  emailStepData,
  personalDetailsStepData,
  homeAddressStepData,
  financialDetailsStepData,
}: UseOnboardingPersistenceProps) {
  const hydratedRef = useRef(false);
  const restoredToastRef = useRef(false);

  const persist = (targetStep: StepKey = step) => {
    try {
      const payload = {
        step: targetStep,
        email: emailStepData.current,
        personalDetails: personalDetailsStepData.current,
        homeAddress: homeAddressStepData.current,
        financialDetails: financialDetailsStepData.current,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch (err) {
      console.error("Failed to persist form data", err);
    }
  };

  // Hydrate from localStorage and URL param
  useEffect(() => {
    if (hydratedRef.current) return;

    let targetStep: StepKey = STEP_EMAIL;
    let hadSavedData = false;

    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        hadSavedData = Boolean(
          parsed.email ||
            parsed.personalDetails ||
            parsed.homeAddress ||
            parsed.financialDetails
        );
        if (parsed.email) emailStepData.current = { ...parsed.email };
        if (parsed.personalDetails)
          personalDetailsStepData.current = { ...parsed.personalDetails };
        if (parsed.homeAddress)
          homeAddressStepData.current = { ...parsed.homeAddress };
        if (parsed.financialDetails)
          financialDetailsStepData.current = { ...parsed.financialDetails };
        if (parsed.step && allowedSteps.includes(parsed.step)) {
          targetStep = parsed.step;
        }
      }
    } catch (err) {
      console.error("Failed to parse saved form data", err);
    }

    const normalized = stepParam as StepKey | undefined;
    if (normalized && allowedSteps.includes(normalized)) {
      targetStep = normalized;
    }

    hydratedRef.current = true;
    setStep(targetStep);
    navigate(`${basePath}/${targetStep}`, { replace: true });

    if (hadSavedData && !restoredToastRef.current) {
      restoredToastRef.current = true;
      // Defer to ensure ToastContainer is mounted
      setTimeout(() => {
        toast.info("Restored your saved progress.", { autoClose: 2000 });
      }, 0);
    }
  }, [
    basePath,
    emailStepData,
    homeAddressStepData,
    navigate,
    personalDetailsStepData,
    setStep,
    stepParam,
    financialDetailsStepData,
  ]);

  // Persist on step changes and keep URL in sync
  useEffect(() => {
    if (!hydratedRef.current) return;
    navigate(`${basePath}/${step}`, { replace: true });
  }, [basePath, navigate, step]);

  return { persist };
}
