type FooterProps = {
  onBack: () => void;
  onNext: () => void;
  currentStep: number;
  totalSteps: number;
  isLoading: boolean;
  isLastStep: boolean;
};

export function Footer({
  onBack,
  onNext,
  currentStep,
  totalSteps,
  isLoading,
  isLastStep,
}: FooterProps) {
  return (
    <footer className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-0 mt-4 sm:mt-6">
      <div className="text-sm text-black/50 dark:text-white/50 order-1 sm:order-2 w-full text-center sm:w-auto sm:text-left">
        Step {currentStep + 1} of {totalSteps}
      </div>
      <div className="flex flex-row gap-3 w-full sm:w-auto order-2 sm:contents">
        <button
          onClick={onBack}
          disabled={currentStep === 0}
          className="flex-1 sm:flex-none sm:w-auto sm:order-1"
        >
          Back
        </button>
        <button
          onClick={onNext}
          disabled={isLoading}
          className="flex-1 sm:flex-none sm:w-auto sm:order-3"
        >
          {isLastStep ? "Submit" : "Next"}
        </button>
      </div>
    </footer>
  );
}
