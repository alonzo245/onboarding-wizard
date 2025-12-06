import { useMemo, useState, useEffect } from "react";
import { useOnboarding } from "../context/OnboardingContext";
import { validateStepPersonal } from "../validation/validation";
import { DatePicker } from "../components/DatePicker";

export function PersonalDetails() {
  const { data, setPersonal } = useOnboarding();
  const [touchedFirst, setTouchedFirst] = useState(false);
  const [touchedLast, setTouchedLast] = useState(false);
  const [touchedDob, setTouchedDob] = useState(false);

  useEffect(() => {
    const handleValidationAttempt = () => {
      setTouchedFirst(true);
      setTouchedLast(true);
      setTouchedDob(true);
    };
    window.addEventListener("wizard:validate-attempt", handleValidationAttempt);
    return () => {
      window.removeEventListener(
        "wizard:validate-attempt",
        handleValidationAttempt
      );
    };
  }, []);
  const errors = useMemo(
    () =>
      validateStepPersonal({
        firstName: data.personal.firstName,
        lastName: data.personal.lastName,
        dateOfBirth: data.personal.dateOfBirth,
      }),
    [data.personal.firstName, data.personal.lastName, data.personal.dateOfBirth]
  );

  return (
    <div className="w-full">
      <h2 className="mt-0 mb-4 sm:mb-6 text-xl sm:text-2xl font-semibold">
        Personal Details
      </h2>
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-3">
        <div className="flex-1 min-w-0">
          <label htmlFor="firstName" className="block mb-2 font-semibold">
            First name
          </label>
          <input
            name="firstName"
            value={data.personal.firstName}
            onChange={(e: any) => setPersonal({ firstName: e.target.value })}
            onBlur={() => setTouchedFirst(true)}
            className="w-full"
          />
          {touchedFirst && errors.firstName && (
            <div className="error mt-1">{errors.firstName}</div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <label htmlFor="lastName" className="block mb-2 font-semibold">
            Last name
          </label>
          <input
            name="lastName"
            value={data.personal.lastName}
            onChange={(e: any) => setPersonal({ lastName: e.target.value })}
            onBlur={() => setTouchedLast(true)}
            className="w-full"
          />
          {touchedLast && errors.lastName && (
            <div className="error mt-1">{errors.lastName}</div>
          )}
        </div>
      </div>
      <div className="mt-4 sm:mt-6 w-full sm:max-w-xs">
        <DatePicker
          label="Date of birth"
          value={data.personal.dateOfBirth}
          onChange={(value) => setPersonal({ dateOfBirth: value })}
          onBlur={() => setTouchedDob(true)}
          error={errors.dateOfBirth}
          touched={touchedDob}
          name="dob"
        />
      </div>
    </div>
  );
}
