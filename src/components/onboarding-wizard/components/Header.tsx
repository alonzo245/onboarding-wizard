import { Link } from "react-router-dom";
import clsx from "clsx";
import { useOnboarding } from "../context/OnboardingContext";
import { useEffect, useRef } from "react";
import {
  validateStepEmail,
  validateStepPersonal,
  validateStepAddress,
  validateStepBusiness,
} from "../validation/validation";

type Step = { path: string; label: string };

export function StepperNav(props: { steps: Step[]; activePath: string }) {
  const { steps, activePath } = props;
  const { furthestStep, data, countries } = useOnboarding();
  const navRef = useRef<HTMLElement>(null);
  const activeStepRef = useRef<HTMLAnchorElement>(null);

  const isStepValidated = (stepPath: string, idx: number): boolean => {
    if (idx > furthestStep) return false;

    if (stepPath === "/onboarding/email") {
      return validateStepEmail(data.email) === null;
    } else if (stepPath === "/onboarding/personal") {
      return Object.keys(validateStepPersonal(data.personal)).length === 0;
    } else if (stepPath === "/onboarding/home-address") {
      return (
        Object.keys(validateStepAddress(data.homeAddress, countries.countries))
          .length === 0
      );
    } else if (stepPath === "/onboarding/business") {
      return (
        Object.keys(validateStepBusiness(data.business, countries.countries))
          .length === 0
      );
    }
    return false;
  };

  useEffect(() => {
    if (activeStepRef.current && navRef.current) {
      const nav = navRef.current;
      const activeLink = activeStepRef.current;
      const navRect = nav.getBoundingClientRect();
      const linkRect = activeLink.getBoundingClientRect();

      const scrollLeft =
        activeLink.offsetLeft - navRect.width / 2 + linkRect.width / 2;

      nav.scrollTo({
        left: scrollLeft,
        behavior: "smooth",
      });
    }
  }, [activePath]);

  return (
    <nav
      ref={navRef}
      className="flex gap-2 sm:gap-3 overflow-x-auto sm:flex-wrap scrollbar-hide"
    >
      {steps.map((s, idx) => {
        const isActive = activePath.startsWith(s.path);
        const isAllowed = idx <= furthestStep;
        const isValidated = isStepValidated(s.path, idx);
        return (
          <Link
            key={s.path}
            ref={isActive ? activeStepRef : null}
            to={s.path}
            className={clsx(
              "px-2 py-1.5 sm:px-3 sm:py-2 rounded-full border no-underline transition-colors text-xs sm:text-sm whitespace-nowrap flex-shrink-0 flex items-center gap-1.5",
              isActive
                ? "bg-[color:color-mix(in_oklab,_Canvas_80%,_CanvasText_20%)] text-[Canvas] border-blue-500 text-white"
                : "border-[color:color-mix(in_oklab,_CanvasText_20%,_transparent)] bg-transparent",
              !isAllowed && "pointer-events-none opacity-50 cursor-not-allowed"
            )}
            aria-disabled={!isAllowed}
            onClick={(e: any) => {
              if (!isAllowed) {
                e.preventDefault();
              }
            }}
          >
            {isValidated ? (
              <span className="flex items-center justify-center w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-green-500 text-white flex-shrink-0">
                <svg
                  className="w-2.5 h-2.5 sm:w-3 sm:h-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </span>
            ) : (
              <span>{idx + 1}.</span>
            )}
            <span>{s.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
