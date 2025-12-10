import {
  EmailStepData,
  PersonalDetailsStepData,
  HomeAddressStepData,
  FinancialDetailsStepData,
} from "../../types";

interface ReviewData
  extends Partial<EmailStepData>,
    Partial<PersonalDetailsStepData>,
    Partial<HomeAddressStepData>,
    Partial<FinancialDetailsStepData> {}

interface ReviewSectionProps {
  title: string;
  children: React.ReactNode;
}

function ReviewSection({ title, children }: ReviewSectionProps) {
  return (
    <div className="bg-gray-700 rounded-lg border border-gray-600 overflow-hidden">
      <div className="px-4 py-3 sm:px-6 sm:py-4 border-b border-gray-600 bg-gray-800/50">
        <h3 className="text-base sm:text-lg font-semibold text-gray-100">
          {title}
        </h3>
      </div>
      <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">{children}</div>
    </div>
  );
}

interface ReviewFieldProps {
  label: string;
  value: string | undefined;
}

function ReviewField({ label, value }: ReviewFieldProps) {
  if (!value) return null;

  return (
    <div className="space-y-1">
      <dt className="text-xs sm:text-sm font-medium text-gray-400 uppercase tracking-wide">
        {label}
      </dt>
      <dd className="text-sm sm:text-base text-gray-200 break-words">
        {value}
      </dd>
    </div>
  );
}

export function Review({ formData }: { formData: ReviewData }) {
  const {
    email,
    firstName,
    lastName,
    dateOfBirth,
    addressLine1,
    addressLine2,
    city,
    state,
    zip,
    income,
    expenses,
    assets,
    liabilities,
    netWorth,
  } = formData;

  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return dateString;
    }
  };

  const fullAddress = [
    addressLine1,
    addressLine2,
    [city, state, zip].filter(Boolean).join(", "),
  ]
    .filter(Boolean)
    .join("\n");

  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-100 mb-2">
          Review Your Information
        </h2>
        <p className="text-sm sm:text-base text-gray-400">
          Please review all the information below before submitting
        </p>
      </div>

      <div className="space-y-4 sm:space-y-5">
        {/* Email Section */}
        {email && (
          <ReviewSection title="Email">
            <ReviewField label="Email Address" value={email} />
          </ReviewSection>
        )}

        {/* Personal Details Section */}
        {(firstName || lastName || dateOfBirth) && (
          <ReviewSection title="Personal Details">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <ReviewField label="First Name" value={firstName} />
              <ReviewField label="Last Name" value={lastName} />
            </div>
            <ReviewField
              label="Date of Birth"
              value={formatDate(dateOfBirth)}
            />
          </ReviewSection>
        )}

        {/* Home Address Section */}
        {(addressLine1 || city || state || zip) && (
          <ReviewSection title="Home Address">
            {fullAddress ? (
              <div className="space-y-1">
                <dt className="text-xs sm:text-sm font-medium text-gray-400 uppercase tracking-wide">
                  Address
                </dt>
                <dd className="text-sm sm:text-base text-gray-200 whitespace-pre-line break-words">
                  {fullAddress}
                </dd>
              </div>
            ) : (
              <>
                <ReviewField label="Address Line 1" value={addressLine1} />
                {addressLine2 && (
                  <ReviewField label="Address Line 2" value={addressLine2} />
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <ReviewField label="City" value={city} />
                  <ReviewField label="State" value={state} />
                </div>
                <ReviewField label="ZIP Code" value={zip} />
              </>
            )}
          </ReviewSection>
        )}

        {/* Financial Details Section */}
        {(income || expenses || assets || liabilities || netWorth) && (
          <ReviewSection title="Financial Details">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <ReviewField label="Income" value={income} />
              <ReviewField label="Expenses" value={expenses} />
              <ReviewField label="Assets" value={assets} />
              <ReviewField label="Liabilities" value={liabilities} />
              <ReviewField label="Net Worth" value={netWorth} />
            </div>
          </ReviewSection>
        )}
      </div>
    </div>
  );
}
