import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
// @ts-ignore - canvas-confetti doesn't have type definitions
import confetti from "canvas-confetti";
import { STEP_EMAIL, StepKey } from "../../constants";

interface ThankYouProps {
  isVisible?: boolean;
  setStep?: (step: StepKey) => void;
}

export function ThankYou({ isVisible = true, setStep }: ThankYouProps) {
  const hasTriggeredRef = useRef(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Only trigger confetti when the step becomes visible and hasn't been triggered yet
    if (!isVisible || hasTriggeredRef.current) {
      return;
    }

    hasTriggeredRef.current = true;

    // Trigger confetti animation when step becomes visible
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);

      // Launch confetti from the left
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      });

      // Launch confetti from the right
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      });
    }, 250);

    // Cleanup interval on unmount
    return () => {
      clearInterval(interval);
      // Allow retrigger if the component remounts (e.g., StrictMode double-invoke)
      hasTriggeredRef.current = false;
    };
  }, [isVisible]);

  return (
    <div className="space-y-6 sm:space-y-8 text-center">
      <div className="space-y-4">
        <div className="mx-auto w-20 h-20 sm:w-24 sm:h-24 bg-green-500 rounded-full flex items-center justify-center">
          <svg
            className="w-10 h-10 sm:w-12 sm:h-12 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={3}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-100">
          Thank You!
        </h2>
        <p className="text-base sm:text-lg text-gray-300 max-w-md mx-auto">
          Your onboarding information has been successfully submitted. We'll be
          in touch soon!
        </p>
      </div>

      <div className="bg-gray-700 rounded-lg p-6 sm:p-8 border border-gray-600">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-100 mb-4">
          What's Next?
        </h3>
        <ul className="space-y-3 text-left text-sm sm:text-base text-gray-300">
          <li className="flex items-start gap-3">
            <span className="text-blue-400 mt-1">✓</span>
            <span>
              You'll receive a confirmation email shortly with next steps
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-400 mt-1">✓</span>
            <span>
              Our team will review your information and get back to you within
              24-48 hours
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-400 mt-1">✓</span>
            <span>
              Check your email for any additional documents or information
              needed
            </span>
          </li>
        </ul>
      </div>

      <div className="pt-4">
        <button
          onClick={() => setStep?.(STEP_EMAIL as StepKey)}
          className="px-6 py-3 text-base font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 active:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-colors"
        >
          Back to Main Page
        </button>
      </div>
    </div>
  );
}
