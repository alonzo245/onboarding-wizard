import { useMemo, useState, useEffect } from "react";
import { useOnboarding } from "../OnboardingContext";
import { validateStepAddress } from "../schema/validation";

export function HomeAddress() {
  const { data, setHomeAddress, countries } = useOnboarding();
  const [tCountry, setTCountry] = useState(false);
  const [tCity, setTCity] = useState(false);
  const [tStreet, setTStreet] = useState(false);
  const [tHouse, setTHouse] = useState(false);
  const [tPostal, setTPostal] = useState(false);

  useEffect(() => {
    const handleValidationAttempt = () => {
      setTCountry(true);
      setTCity(true);
      setTStreet(true);
      setTHouse(true);
      setTPostal(true);
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
      validateStepAddress(
        {
          countryCode: data.homeAddress.countryCode,
          city: data.homeAddress.city,
          street: data.homeAddress.street,
          houseNumber: data.homeAddress.houseNumber,
          postalCode: data.homeAddress.postalCode,
        },
        countries.countries
      ),
    [
      data.homeAddress.countryCode,
      data.homeAddress.city,
      data.homeAddress.street,
      data.homeAddress.houseNumber,
      data.homeAddress.postalCode,
      countries.countries,
    ]
  );
  const selectedCountry = countries.countries.find(
    (c: any) => c.code === data.homeAddress.countryCode
  );
  const cityOptions = selectedCountry?.cities ?? [];

  return (
    <div className="w-full">
      <h2 className="mt-0 mb-4 sm:mb-6 text-xl sm:text-2xl font-semibold">
        Home Address
      </h2>
      {countries.loading && <div className="mb-4">Loading countries...</div>}
      {countries.error && <div className="error mb-4">{countries.error}</div>}
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-3">
        <div className="flex-1 min-w-0">
          <label htmlFor="country" className="block mb-2 font-semibold">
            Country
          </label>
          <select
            id="country"
            value={data.homeAddress.countryCode}
            onChange={(e: any) => {
              const newCode = e.target.value;
              setHomeAddress({ countryCode: newCode, city: "" });
              setTCountry(true);
              setTCity(false);
            }}
            onBlur={() => setTCountry(true)}
            className="w-full"
          >
            <option value="">Select a country</option>
            {countries.countries.map((c: any) => (
              <option key={c.code} value={c.code}>
                {c.name}
              </option>
            ))}
          </select>
          {tCountry && errors.countryCode && (
            <div className="error mt-1">{errors.countryCode}</div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <label htmlFor="city" className="block mb-2 font-semibold">
            City
          </label>
          <select
            id="city"
            value={data.homeAddress.city}
            onChange={(e: any) => {
              setHomeAddress({ city: e.target.value });
              setTCity(true);
            }}
            disabled={!data.homeAddress.countryCode}
            onBlur={() => setTCity(true)}
            className="w-full"
          >
            <option value="">Select a city</option>
            {cityOptions.map((c: any) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          {tCity && errors.city && (
            <div className="error mt-1">{errors.city}</div>
          )}
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-3 mt-4 sm:mt-6">
        <div className="flex-1 min-w-0">
          <label htmlFor="street" className="block mb-2 font-semibold">
            Street
          </label>
          <input
            name="street"
            value={data.homeAddress.street}
            onChange={(e: any) => setHomeAddress({ street: e.target.value })}
            onBlur={() => setTStreet(true)}
            className="w-full"
          />
          {tStreet && errors.street && (
            <div className="error mt-1">{errors.street}</div>
          )}
        </div>
        <div className="flex-1 min-w-0 sm:max-w-[120px]">
          <label htmlFor="houseNumber" className="block mb-2 font-semibold">
            House number
          </label>
          <input
            name="houseNumber"
            value={data.homeAddress.houseNumber}
            onChange={(e: any) =>
              setHomeAddress({ houseNumber: e.target.value })
            }
            onBlur={() => setTHouse(true)}
            className="w-full"
          />
          {tHouse && errors.houseNumber && (
            <div className="error mt-1">{errors.houseNumber}</div>
          )}
        </div>
        <div className="flex-1 min-w-0 sm:max-w-[140px]">
          <label htmlFor="postalCode" className="block mb-2 font-semibold">
            Postal code
          </label>
          <input
            name="postalCode"
            value={data.homeAddress.postalCode}
            onChange={(e: any) =>
              setHomeAddress({ postalCode: e.target.value })
            }
            onBlur={() => setTPostal(true)}
            className="w-full"
          />
          {tPostal && errors.postalCode && (
            <div className="error mt-1">{errors.postalCode}</div>
          )}
        </div>
      </div>
    </div>
  );
}
