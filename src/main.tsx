import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { OnboardingProvider } from "./components/onboarding-wizard/context/OnboardingContext";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <OnboardingProvider>
        <RouterProvider router={router} />
        <ToastContainer
          aria-label="Notifications"
          position="top-right"
          newestOnTop
          autoClose={1000}
        />
      </OnboardingProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
