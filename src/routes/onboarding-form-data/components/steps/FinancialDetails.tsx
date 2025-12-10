import { useErrorsStore } from "../../store/errorsStore";
import { FinancialDetailsStepData } from "../../types";

export function FinancialDetails({
  initialValues,
  onPersist,
}: {
  initialValues: FinancialDetailsStepData;
  onPersist?: () => void;
}) {
  const getFieldError = useErrorsStore((state) => state.getFieldError);

  const fields: Array<{
    id: keyof FinancialDetailsStepData;
    label: string;
    placeholder: string;
  }> = [
    { id: "income", label: "Income", placeholder: "Monthly income" },
    { id: "expenses", label: "Expenses", placeholder: "Monthly expenses" },
    { id: "assets", label: "Assets", placeholder: "Total assets" },
    {
      id: "liabilities",
      label: "Liabilities",
      placeholder: "Total liabilities",
    },
    { id: "netWorth", label: "Net Worth", placeholder: "Net worth" },
  ];

  return (
    <div className="space-y-4">
      <div className="space-y-4 sm:space-y-5">
        {fields.map((field) => (
          <div key={field.id}>
            <label
              htmlFor={field.id}
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              {field.label}
            </label>
            <input
              id={field.id}
              name={field.id}
              type="text"
              placeholder={field.placeholder}
              defaultValue={initialValues[field.id] || ""}
              onChange={(e) => {
                initialValues[field.id] = e.target.value;
                onPersist?.();
              }}
              className="w-full sm:max-w-md px-3 py-2 sm:py-2.5 bg-gray-700 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base sm:text-sm"
            />
            {getFieldError(field.id) && (
              <div className="text-red-400 text-sm mt-1.5">
                {getFieldError(field.id)}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
