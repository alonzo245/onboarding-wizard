import { useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Email } from "./components/steps/Email";
import { PersonalDetails } from "./components/steps/PersonalDetails";
import { HomeAddress } from "./components/steps/HomeAddress";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Review } from "./components/steps/Review";
import { ThankYou } from "./components/steps/ThankYou";
import { Step } from "./components/Step";
import {
  STEP_EMAIL,
  STEP_PERSONAL_DETAILS,
  STEP_HOME_ADDRESS,
  STEP_FINANCIAL_DETAILS,
  STEP_REVIEW,
  STEP_THANK_YOU,
  type StepKey,
} from "./constants";
import { Form } from "react-aria-components";
import { useOnboardingSubmit } from "./hooks/useOnboardingSubmit";
import {
  EmailStepData,
  PersonalDetailsStepData,
  HomeAddressStepData,
  FinancialDetailsStepData,
} from "./types";
import { stepsConfig } from "./config/stepsConfig";
import { BASE_URL } from "../../router";
import { useOnboardingPersistence } from "./hooks/useOnboardingPersistence";
import { FinancialDetails } from "./components/steps/FinancialDetails";

export function OnboardingWizard() {
  const [step, setStep] = useState<StepKey>(STEP_EMAIL);
  const navigate = useNavigate();
  const { step: stepParam } = useParams<{ step?: string }>();

  const emailStepData = useRef<EmailStepData>({ ...stepsConfig.email });
  const personalDetailsStepData = useRef<PersonalDetailsStepData>({
    ...stepsConfig.personalDetails,
  });
  const homeAddressStepData = useRef<HomeAddressStepData>({
    ...stepsConfig.homeAddress,
  });
  const financialDetailsStepData = useRef<FinancialDetailsStepData>({
    ...stepsConfig.financialDetails,
  });

  const { handleOnSubmit, resetKey } = useOnboardingSubmit({
    step,
    setStep,
    emailStepData,
    personalDetailsStepData,
    homeAddressStepData,
    financialDetailsStepData,
  });

  const { persist } = useOnboardingPersistence({
    step,
    setStep,
    stepParam,
    basePath: BASE_URL,
    navigate,
    emailStepData,
    personalDetailsStepData,
    homeAddressStepData,
    financialDetailsStepData,
  });

  const onPrevious = () => {
    if (step === STEP_PERSONAL_DETAILS) {
      setStep(STEP_EMAIL);
    } else if (step === STEP_HOME_ADDRESS) {
      setStep(STEP_PERSONAL_DETAILS);
    } else if (step === STEP_FINANCIAL_DETAILS) {
      setStep(STEP_HOME_ADDRESS);
    } else if (step === STEP_REVIEW) {
      setStep(STEP_FINANCIAL_DETAILS);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 py-4 px-4 sm:py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-100 mb-6 sm:mb-8">
          Onboarding Wizard
        </h1>
        <Form onSubmit={handleOnSubmit}>
          <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-4 sm:p-6 lg:p-8">
            <Header currentStep={step} setStep={setStep} />
            <div className="mt-6 sm:mt-8">
              <Step visible={step === STEP_EMAIL}>
                <Email
                  key={`email-${resetKey}`}
                  initialValues={emailStepData}
                  onPersist={() => persist()}
                />
              </Step>
              <Step visible={step === STEP_PERSONAL_DETAILS}>
                <PersonalDetails
                  key={`personalDetails-${resetKey}`}
                  initialValues={personalDetailsStepData.current}
                  onPersist={() => persist()}
                />
              </Step>
              <Step visible={step === STEP_HOME_ADDRESS}>
                <HomeAddress
                  key={`homeAddress-${resetKey}`}
                  initialValues={homeAddressStepData.current}
                  onPersist={() => persist()}
                />
              </Step>
              <Step visible={step === STEP_FINANCIAL_DETAILS}>
                <FinancialDetails
                  key={`financial-${resetKey}`}
                  initialValues={financialDetailsStepData.current}
                  onPersist={() => persist()}
                />
              </Step>
              <Step visible={step === STEP_REVIEW}>
                <Review
                  formData={{
                    ...emailStepData.current,
                    ...personalDetailsStepData.current,
                    ...homeAddressStepData.current,
                    ...financialDetailsStepData.current,
                  }}
                />
              </Step>
              {step === STEP_THANK_YOU && (
                <ThankYou
                  isVisible={step === STEP_THANK_YOU}
                  setStep={setStep}
                />
              )}
            </div>
            {step !== STEP_THANK_YOU && (
              <Footer currentStep={step} onPrevious={onPrevious} />
            )}
          </div>
        </Form>
      </div>
    </div>
  );
}
