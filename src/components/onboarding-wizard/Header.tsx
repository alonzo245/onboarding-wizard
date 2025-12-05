import { Link } from "react-router-dom";
import clsx from "clsx";
import { useOnboarding } from "./OnboardingContext";
import { useEffect, useRef } from "react";

type Step = { path: string; label: string };

export function StepperNav(props: { steps: Step[]; activePath: string }) {
  const { steps, activePath } = props;
  const { furthestStep } = useOnboarding();
  const navRef = useRef<HTMLElement>(null);
  const activeStepRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (activeStepRef.current && navRef.current) {
      const nav = navRef.current;
      const activeLink = activeStepRef.current;
      const navRect = nav.getBoundingClientRect();
      const linkRect = activeLink.getBoundingClientRect();

      // Calculate scroll position to center the active step
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
        return (
          <Link
            key={s.path}
            ref={isActive ? activeStepRef : null}
            to={s.path}
            className={clsx(
              "px-2 py-1.5 sm:px-3 sm:py-2 rounded-full border no-underline transition-colors text-xs sm:text-sm whitespace-nowrap flex-shrink-0",
              isActive
                ? "border-transparent bg-[color:color-mix(in_oklab,_Canvas_80%,_CanvasText_20%)] text-[Canvas] border-blue-500 text-white"
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
            {idx + 1}. {s.label}
          </Link>
        );
      })}
    </nav>
  );
}
