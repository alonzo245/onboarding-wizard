import { RefObject } from "react";
import { useErrorsStore } from "../../store/errorsStore";
import { EmailStepData } from "../../types";

export function Email({
  initialValues,
  onPersist,
}: {
  initialValues: RefObject<EmailStepData>;
  onPersist?: () => void;
}) {
  const getFieldError = useErrorsStore((state) => state.getFieldError);
  const emailError = getFieldError("email");

  return (
    <div className="space-y-4">
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-300 mb-2"
        >
          Email
        </label>
        <input
          id="email"
          name="email"
          type="text" // keep browser validation off; zod handles errors
          inputMode="email"
          autoComplete="off"
          className="w-full sm:max-w-md px-3 py-2 sm:py-2.5 bg-gray-700 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base sm:text-sm"
          defaultValue={initialValues.current.email}
          onChange={(e) => {
            initialValues.current.email = e.target.value;
            onPersist?.();
          }}
        />
        {emailError && (
          <div className="text-red-400 text-sm mt-1.5">{emailError}</div>
        )}
      </div>
    </div>
  );
}
