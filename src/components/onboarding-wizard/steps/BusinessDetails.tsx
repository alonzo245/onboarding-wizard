import { useMemo, useState, useEffect } from "react";
import { useOnboarding } from "../OnboardingContext";
import { validateStepBusiness } from "../schema/validation";

export function BusinessDetails() {
  const { data, setBusiness, setOwnerAddress, countries } = useOnboarding();
  const [tBizName, setTBizName] = useState(false);
  const [tIncDate, setTIncDate] = useState(false);
  const [tOwnerCountry, setTOwnerCountry] = useState(false);
  const [tOwnerCity, setTOwnerCity] = useState(false);
  const [tOwnerStreet, setTOwnerStreet] = useState(false);
  const [tOwnerHouse, setTOwnerHouse] = useState(false);
  const [tOwnerPostal, setTOwnerPostal] = useState(false);

  useEffect(() => {
    const handleValidationAttempt = () => {
      setTBizName(true);
      setTIncDate(true);
      setTOwnerCountry(true);
      setTOwnerCity(true);
      setTOwnerStreet(true);
      setTOwnerHouse(true);
      setTOwnerPostal(true);
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
      validateStepBusiness(
        {
          businessName: data.business.businessName,
          incorporationDate: data.business.incorporationDate,
          ownerAddress: {
            countryCode: data.business.ownerAddress.countryCode,
            city: data.business.ownerAddress.city,
            street: data.business.ownerAddress.street,
            houseNumber: data.business.ownerAddress.houseNumber,
            postalCode: data.business.ownerAddress.postalCode,
          },
        },
        countries.countries
      ),
    [
      data.business.businessName,
      data.business.incorporationDate,
      data.business.ownerAddress.countryCode,
      data.business.ownerAddress.city,
      data.business.ownerAddress.street,
      data.business.ownerAddress.houseNumber,
      data.business.ownerAddress.postalCode,
      countries.countries,
    ]
  );
  const selectedOwnerCountry = countries.countries.find(
    (c: any) => c.code === data.business.ownerAddress.countryCode
  );
  const ownerCities = selectedOwnerCountry?.cities ?? [];

  return (
    <div className="w-full">
      <h2 className="mt-0 mb-4 sm:mb-6 text-xl sm:text-2xl font-semibold">
        Business Details
      </h2>

      <div className="flex flex-col sm:flex-row gap-4 sm:gap-3">
        <div className="flex-1 min-w-0">
          <label htmlFor="businessName" className="block mb-2 font-semibold">
            Business name
          </label>
          <input
            name="businessName"
            value={data.business.businessName}
            onChange={(e: any) => setBusiness({ businessName: e.target.value })}
            onBlur={() => setTBizName(true)}
            className="w-full"
          />
          {tBizName && errors.businessName && (
            <div className="error mt-1">{errors.businessName}</div>
          )}
        </div>
        <div className="flex-1 min-w-0 sm:max-w-[260px]">
          <label htmlFor="incDate" className="block mb-2 font-semibold">
            Date of incorporation
          </label>
          <input
            name="incDate"
            type="date"
            value={data.business.incorporationDate}
            onChange={(e: any) =>
              setBusiness({ incorporationDate: e.target.value })
            }
            onBlur={() => setTIncDate(true)}
            className="w-full"
          />
          {tIncDate && errors.incorporationDate && (
            <div className="error mt-1">{errors.incorporationDate}</div>
          )}
        </div>
      </div>

      <h3 className="mt-6 sm:mt-8 mb-4 sm:mb-6 text-lg sm:text-xl font-semibold">
        Owner Address
      </h3>
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-3">
        <div className="flex-1 min-w-0">
          <label htmlFor="ownerCountry" className="block mb-2 font-semibold">
            Country
          </label>
          <select
            id="ownerCountry"
            value={data.business.ownerAddress.countryCode}
            onChange={(e: any) => {
              const newCode = e.target.value;
              setOwnerAddress({ countryCode: newCode, city: "" });
              setTOwnerCountry(true);
              setTOwnerCity(false);
            }}
            onBlur={() => setTOwnerCountry(true)}
            className="w-full"
          >
            <option value="">Select a country</option>
            {countries.countries.map((c: any) => (
              <option key={c.code} value={c.code}>
                {c.name}
              </option>
            ))}
          </select>
          {tOwnerCountry && errors["ownerAddress.countryCode"] && (
            <div className="error mt-1">
              {errors["ownerAddress.countryCode"]}
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <label htmlFor="ownerCity" className="block mb-2 font-semibold">
            City
          </label>
          <select
            id="ownerCity"
            value={data.business.ownerAddress.city}
            onChange={(e: any) => setOwnerAddress({ city: e.target.value })}
            disabled={!data.business.ownerAddress.countryCode}
            onBlur={() => setTOwnerCity(true)}
            className="w-full"
          >
            <option value="">Select a city</option>
            {ownerCities.map((c: any) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          {tOwnerCity && errors["ownerAddress.city"] && (
            <div className="error mt-1">{errors["ownerAddress.city"]}</div>
          )}
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-3 mt-4 sm:mt-6">
        <div className="flex-1 min-w-0">
          <label htmlFor="ownerStreet" className="block mb-2 font-semibold">
            Street
          </label>
          <input
            name="ownerStreet"
            value={data.business.ownerAddress.street}
            onChange={(e: any) => setOwnerAddress({ street: e.target.value })}
            onBlur={() => setTOwnerStreet(true)}
            className="w-full"
          />
          {tOwnerStreet && errors["ownerAddress.street"] && (
            <div className="error mt-1">{errors["ownerAddress.street"]}</div>
          )}
        </div>
        <div className="flex-1 min-w-0 sm:max-w-[120px]">
          <label htmlFor="ownerHouse" className="block mb-2 font-semibold">
            House number
          </label>
          <input
            name="ownerHouse"
            value={data.business.ownerAddress.houseNumber}
            onChange={(e: any) =>
              setOwnerAddress({ houseNumber: e.target.value })
            }
            onBlur={() => setTOwnerHouse(true)}
            className="w-full"
          />
          {tOwnerHouse && errors["ownerAddress.houseNumber"] && (
            <div className="error mt-1">
              {errors["ownerAddress.houseNumber"]}
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0 sm:max-w-[140px]">
          <label htmlFor="ownerPostal" className="block mb-2 font-semibold">
            Postal code
          </label>
          <input
            name="ownerPostal"
            value={data.business.ownerAddress.postalCode}
            onChange={(e: any) =>
              setOwnerAddress({ postalCode: e.target.value })
            }
            onBlur={() => setTOwnerPostal(true)}
            className="w-full"
          />
          {tOwnerPostal && errors["ownerAddress.postalCode"] && (
            <div className="error mt-1">
              {errors["ownerAddress.postalCode"]}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
