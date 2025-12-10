import { useErrorsStore } from "../../store/errorsStore";
import { HomeAddressStepData } from "../../types";

export function HomeAddress({
  initialValues,
  onPersist,
}: {
  initialValues: HomeAddressStepData;
  onPersist?: () => void;
}) {
  const getFieldError = useErrorsStore((state) => state.getFieldError);

  return (
    <div className="space-y-4">
      <div className="space-y-4 sm:space-y-5">
        <div>
          <label
            htmlFor="addressLine1"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            Address Line 1 <span className="text-red-400">*</span>
          </label>
          <input
            id="addressLine1"
            type="text"
            placeholder="Street address"
            name="addressLine1"
            defaultValue={initialValues.addressLine1}
            onChange={(e) => {
              initialValues.addressLine1 = e.target.value;
              onPersist?.();
            }}
            className="w-full sm:max-w-md px-3 py-2 sm:py-2.5 bg-gray-700 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base sm:text-sm"
          />
          {getFieldError("addressLine1") && (
            <div className="text-red-400 text-sm mt-1.5">
              {getFieldError("addressLine1")}
            </div>
          )}
        </div>
        <div>
          <label
            htmlFor="addressLine2"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            Address Line 2
          </label>
          <input
            id="addressLine2"
            type="text"
            placeholder="Apartment, suite, etc. (optional)"
            name="addressLine2"
            defaultValue={initialValues.addressLine2 || ""}
            onChange={(e) => {
              initialValues.addressLine2 = e.target.value;
              onPersist?.();
            }}
            className="w-full sm:max-w-md px-3 py-2 sm:py-2.5 bg-gray-700 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base sm:text-sm"
          />
          {getFieldError("addressLine2") && (
            <div className="text-red-400 text-sm mt-1.5">
              {getFieldError("addressLine2")}
            </div>
          )}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="city"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              City <span className="text-red-400">*</span>
            </label>
            <input
              id="city"
              type="text"
              placeholder="City"
              name="city"
              defaultValue={initialValues.city}
              onChange={(e) => {
                initialValues.city = e.target.value;
                onPersist?.();
              }}
              className="w-full px-3 py-2 sm:py-2.5 bg-gray-700 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base sm:text-sm"
            />
            {getFieldError("city") && (
              <div className="text-red-400 text-sm mt-1.5">
                {getFieldError("city")}
              </div>
            )}
          </div>
          <div>
            <label
              htmlFor="state"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              State <span className="text-red-400">*</span>
            </label>
            <input
              id="state"
              type="text"
              placeholder="State"
              name="state"
              defaultValue={initialValues.state}
              onChange={(e) => {
                initialValues.state = e.target.value;
                onPersist?.();
              }}
              className="w-full px-3 py-2 sm:py-2.5 bg-gray-700 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base sm:text-sm"
            />
            {getFieldError("state") && (
              <div className="text-red-400 text-sm mt-1.5">
                {getFieldError("state")}
              </div>
            )}
          </div>
        </div>
        <div>
          <label
            htmlFor="zip"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            ZIP Code <span className="text-red-400">*</span>
          </label>
          <input
            id="zip"
            type="text"
            placeholder="12345"
            name="zip"
            maxLength={5}
            defaultValue={initialValues.zip}
            onChange={(e) => {
              initialValues.zip = e.target.value;
              onPersist?.();
            }}
            className="w-full px-3 py-2 sm:py-2.5 bg-gray-700 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base sm:text-sm sm:max-w-xs"
          />
          {getFieldError("zip") && (
            <div className="text-red-400 text-sm mt-1.5">
              {getFieldError("zip")}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
