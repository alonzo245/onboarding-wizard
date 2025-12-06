type FooterProps = {
  onBack: () => void;
  onNext: () => void;
  currentStep: number;
  totalSteps: number;
  isLoading: boolean;
  isLastStep: boolean;
};

const Spinner = () => (
  <svg
    className="animate-spin h-4 w-4"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </svg>
);

export function Footer({
  onBack,
  onNext,
  currentStep,
  totalSteps,
  isLoading,
  isLastStep,
}: FooterProps) {
  const buttonText = isLastStep ? "Submit" : "Next";

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
          className="flex-1 sm:flex-none sm:w-auto sm:order-3 flex items-center justify-center gap-2"
        >
          {isLoading && <Spinner />}
          {buttonText}
        </button>
      </div>
    </footer>
  );
}
