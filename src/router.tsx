import { createBrowserRouter, Navigate } from "react-router-dom";
import { OnboardingWizard } from "./routes/onboarding-form-data/OnboardingWizard";
import { ROOT_PATH } from "./constants";

// GitHub Pages base path
export const BASE_URL = "/onboarding-form-data";
const REDIRECT_TO_EMAIL = `${BASE_URL}/email`;

export const router = createBrowserRouter([
  {
    path: ROOT_PATH,
    element: <Navigate to={REDIRECT_TO_EMAIL} replace />,
  },
  {
    path: BASE_URL,
    children: [
      {
        index: true,
        element: <Navigate to={REDIRECT_TO_EMAIL} replace />,
      },
      {
        path: ":step",
        element: <OnboardingWizard />,
      },
    ],
  },
]);
