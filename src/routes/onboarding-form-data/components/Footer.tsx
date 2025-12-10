import { type StepKey, STEP_EMAIL } from "../constants";

interface FooterProps {
  currentStep: StepKey;
  onPrevious: () => void;
}

export function Footer({ currentStep, onPrevious }: FooterProps) {
  const isFirstStep = currentStep === STEP_EMAIL;

  return (
    <div className="flex flex-row justify-between gap-3 sm:gap-4 mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-gray-700">
      <button
        type="button"
        onClick={onPrevious}
        disabled={isFirstStep}
        className={`w-1/2 sm:w-auto px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base font-medium rounded-md transition-colors ${
          isFirstStep
            ? "bg-gray-700 text-gray-500 cursor-not-allowed"
            : "bg-gray-700 text-gray-200 border border-gray-600 hover:bg-gray-600 active:bg-gray-500"
        }`}
      >
        Previous
      </button>
      <button
        type="submit"
        className="w-1/2 sm:w-auto px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 active:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-colors"
      >
        Next
      </button>
    </div>
  );
}
