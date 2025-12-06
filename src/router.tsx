import { createBrowserRouter, Navigate } from "react-router-dom";
import { Email } from "./components/onboarding-wizard/steps/Email";
import { PersonalDetails } from "./components/onboarding-wizard/steps/PersonalDetails";
import { HomeAddress } from "./components/onboarding-wizard/steps/HomeAddress";
import { BusinessDetails } from "./components/onboarding-wizard/steps/BusinessDetails";
import { ReviewSubmit } from "./components/onboarding-wizard/steps/ReviewSubmit";
import { ThankYou } from "./components/onboarding-wizard/steps/ThankYou";
import { OnboardingWizard } from "./components/onboarding-wizard/OnboardingWizard";

// Get base path from import.meta.env.BASE_URL (set by Vite)
const basePath = import.meta.env.BASE_URL || "/";

export const router = createBrowserRouter(
  [
  {
    path: "/",
      element: <Navigate to="/onboarding" replace />,
    },
    {
      path: "/onboarding",
      element: <OnboardingWizard />,
    children: [
        { index: true, element: <Navigate to="/onboarding/email" replace /> },
        { path: "email", element: <Email /> },
        { path: "personal", element: <PersonalDetails /> },
        { path: "home-address", element: <HomeAddress /> },
        { path: "business", element: <BusinessDetails /> },
        { path: "review", element: <ReviewSubmit /> },
        { path: "thank-you", element: <ThankYou /> },
    ],
  },
  ],
  {
    basename: basePath === "/" ? undefined : basePath.replace(/\/$/, ""),
  }
);
