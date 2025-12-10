import { useErrorsStore } from "../../store/errorsStore";
import { PersonalDetailsStepData } from "../../types";

const getTodayDate = (): string => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export function PersonalDetails({
  initialValues,
  onPersist,
}: {
  initialValues: PersonalDetailsStepData;
  onPersist?: () => void;
}) {
  const getFieldError = useErrorsStore((state) => state.getFieldError);

  return (
    <div className="space-y-4">
      <div className="space-y-4 sm:space-y-5">
        <div>
          <label
            htmlFor="firstName"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            First Name
          </label>
          <input
            id="firstName"
            type="text"
            placeholder="First Name"
            name="firstName"
            defaultValue={initialValues.firstName}
            onChange={(e) => {
              initialValues.firstName = e.target.value;
              onPersist?.();
            }}
            className="w-full sm:max-w-md px-3 py-2 sm:py-2.5 bg-gray-700 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base sm:text-sm"
          />
          {getFieldError("firstName") && (
            <div className="text-red-400 text-sm mt-1.5">
              {getFieldError("firstName")}
            </div>
          )}
        </div>
        <div>
          <label
            htmlFor="lastName"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            Last Name
          </label>
          <input
            id="lastName"
            type="text"
            placeholder="Last Name"
            name="lastName"
            defaultValue={initialValues.lastName}
            onChange={(e) => {
              initialValues.lastName = e.target.value;
              onPersist?.();
            }}
            className="w-full sm:max-w-md px-3 py-2 sm:py-2.5 bg-gray-700 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base sm:text-sm"
          />
          {getFieldError("lastName") && (
            <div className="text-red-400 text-sm mt-1.5">
              {getFieldError("lastName")}
            </div>
          )}
        </div>
        <div>
          <label
            htmlFor="dateOfBirth"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            Date of Birth
          </label>
          <input
            id="dateOfBirth"
            type="date"
            name="dateOfBirth"
            defaultValue={initialValues.dateOfBirth || getTodayDate()}
            onChange={(e) => {
              initialValues.dateOfBirth = e.target.value;
              onPersist?.();
            }}
            className="w-full sm:max-w-xs px-3 py-2 sm:py-2.5 bg-gray-700 border border-gray-600 rounded-md shadow-sm text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base sm:text-sm"
          />
          {getFieldError("dateOfBirth") && (
            <div className="text-red-400 text-sm mt-1.5">
              {getFieldError("dateOfBirth")}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
