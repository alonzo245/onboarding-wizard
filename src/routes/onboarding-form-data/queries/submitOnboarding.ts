import { useMutation, useQuery } from "@tanstack/react-query";

export interface OnboardingFormData {
  email: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  zip: string;
}

interface SubmitResponse {
  success: boolean;
  message: string;
  data?: OnboardingFormData;
}

// Mock API function to submit onboarding data
export const submitOnboardingData = async (
  data: OnboardingFormData
): Promise<SubmitResponse> => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // Mock URL endpoint
  const response = await fetch("/onboarding-form-data/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).catch(() => {
    return {
      ok: true,
      json: async () => ({
        success: true,
        message: "Onboarding data submitted successfully",
        data,
      }),
    } as Response;
  });

  if (!response.ok) {
    throw new Error("Failed to submit onboarding data");
  }

  return response.json();
};
