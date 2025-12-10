import { create } from "zustand";
import { ZodError } from "zod";

interface ErrorsState {
  errors: Record<string, string>;
  setErrors: (errors: Record<string, string>) => void;
  setZodError: (error: ZodError) => void;
  clearErrors: () => void;
  getFieldError: (fieldName: string) => string | undefined;
}

export const useErrorsStore = create<ErrorsState>((set, get) => ({
  errors: {},
  setErrors: (errors) => set({ errors }),
  setZodError: (error) => {
    const fieldErrors: Record<string, string> = {};
    error.issues.forEach((issue) => {
      const path = issue.path.join(".");
      fieldErrors[path] = issue.message;
    });
    set({ errors: fieldErrors });
  },
  clearErrors: () => set({ errors: {} }),
  getFieldError: (fieldName: string) => {
    return get().errors[fieldName];
  },
}));
