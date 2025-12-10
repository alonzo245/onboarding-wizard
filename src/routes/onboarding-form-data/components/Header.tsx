import clsx from "clsx";
import { useEffect, useRef } from "react";
import { stepsConfig } from "../config/stepsConfig";
import {
  type StepKey,
  STEP_EMAIL,
  STEP_PERSONAL_DETAILS,
  STEP_HOME_ADDRESS,
  STEP_FINANCIAL_DETAILS,
  STEP_REVIEW,
  STEP_THANK_YOU,
} from "../constants";

interface HeaderProps {
  currentStep: string;
  setStep?: (step: StepKey) => void;
}

export function Header({ currentStep, setStep }: HeaderProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  useEffect(() => {
    const activeStepRef = stepRefs.current[currentStep];
    const container = scrollContainerRef.current;

    if (activeStepRef && container) {
      const containerRect = container.getBoundingClientRect();
      const stepRect = activeStepRef.getBoundingClientRect();
      const scrollLeft = container.scrollLeft;
      const stepLeft = stepRect.left - containerRect.left + scrollLeft;
      const stepWidth = stepRect.width;
      const containerWidth = containerRect.width;

      // Center the active step
      const targetScroll = stepLeft - containerWidth / 2 + stepWidth / 2;

      container.scrollTo({
        left: targetScroll,
        behavior: "smooth",
      });
    }
  }, [currentStep]);

  const handleStepClick = (clickedStep: StepKey) => {
    if (!setStep || currentStep === STEP_THANK_YOU) return;

    const stepOrder = [
      STEP_EMAIL,
      STEP_PERSONAL_DETAILS,
      STEP_HOME_ADDRESS,
      STEP_FINANCIAL_DETAILS,
      STEP_REVIEW,
      STEP_THANK_YOU,
    ];
    const currentIndex = stepOrder.indexOf(currentStep as StepKey);
    const clickedIndex = stepOrder.indexOf(clickedStep);

    if (clickedIndex <= currentIndex && clickedStep !== STEP_THANK_YOU) {
      setStep(clickedStep);
    }
  };

  const isThankYouStep = currentStep === STEP_THANK_YOU;

  return (
    <div className="border-b border-gray-700 pb-4 sm:pb-6">
      <div
        ref={scrollContainerRef}
        className="header-scroll-container flex overflow-x-auto gap-2 sm:gap-4 sm:flex-wrap scroll-smooth"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {Object.keys(stepsConfig).map((stepName, index) => {
          const isActive = currentStep === stepName;
          const stepKeys = Object.keys(stepsConfig) as StepKey[];
          const currentStepIndex = stepKeys.indexOf(currentStep as StepKey);
          const stepIndex = stepKeys.indexOf(stepName as StepKey);
          const isClickable =
            !isThankYouStep && stepIndex <= currentStepIndex && setStep;
          const isCompleted = stepIndex < currentStepIndex;

          const handleClick = () => {
            if (isClickable) {
              handleStepClick(stepName as StepKey);
            }
          };

          return (
            <div
              key={stepName}
              ref={(el) => {
                stepRefs.current[stepName] = el;
              }}
              onClick={handleClick}
              className={clsx(
                "flex items-center gap-2 text-sm sm:text-base font-medium transition-colors flex-shrink-0",
                isActive ? "text-blue-400" : "text-gray-400",
                isClickable
                  ? "cursor-pointer hover:text-blue-300"
                  : "cursor-default",
                isCompleted && "opacity-75",
                isThankYouStep && "opacity-50"
              )}
            >
              <div
                className={clsx(
                  "flex items-center justify-center w-6 h-6 sm:w-6 sm:h-6 rounded-full border-2 transition-colors",
                  isActive
                    ? "border-blue-500 bg-blue-900/30 text-blue-400"
                    : isCompleted
                    ? "border-gray-500 bg-gray-600 text-gray-300"
                    : "border-gray-600 bg-gray-700 text-gray-400",
                  isClickable && !isThankYouStep && "hover:border-blue-400"
                )}
              >
                {index + 1}
              </div>
              <span className="capitalize whitespace-nowrap">
                {stepName.replace(/([A-Z])/g, " $1").trim()}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
