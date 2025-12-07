import usersData from "./me.json";
import countriesData from "./countries.json" assert { type: "json" };
import { toast } from "react-toastify";

function simulateNetwork<T>(
  data: T,
  options?: {
    failRate?: number;
    minDelayMs?: number;
    maxDelayMs?: number;
  }
): Promise<T> {
  const failRate = options?.failRate ?? 0.1;
  const minDelayMs = options?.minDelayMs ?? 300;
  const maxDelayMs = options?.maxDelayMs ?? 900;

  const delay =
    Math.floor(Math.random() * (maxDelayMs - minDelayMs + 1)) + minDelayMs;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < failRate) {
        reject(new Error("Network error"));
      } else {
        resolve(data);
      }
    }, delay);
  });
}

export function fetchCountries(): Promise<unknown[]> {
  return simulateNetwork(countriesData as unknown[], {
    failRate: 0.05,
    minDelayMs: 200,
    maxDelayMs: 600,
  });
}

export function fetchUserByEmail(email: string): Promise<unknown | null> {
  const normalized = email.trim().toLowerCase();
  const users = usersData as unknown[];

  const match = users.find((u): boolean => {
    if (typeof u !== "object" || u === null) {
      return false;
    }
    const obj = u as Record<string, unknown>;
    const value = obj.email;
    return typeof value === "string" && value.toLowerCase() === normalized;
  });

  return simulateNetwork(match ?? null, {
    failRate: 0.1,
    minDelayMs: 300,
    maxDelayMs: 800,
  });
}

export function submitApplication(
  payload: unknown
): Promise<{ success: true }> {
  // eslint-disable-next-line no-console
  console.log("Submitting onboarding application payload:", payload);
  return simulateNetwork(
    { success: true as const },
    {
      failRate: 0.2,
      minDelayMs: 500,
      maxDelayMs: 1500,
    }
  );
}
