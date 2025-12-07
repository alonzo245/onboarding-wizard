import { useMemo, useState, useEffect } from "react";
import { useOnboarding } from "../context/OnboardingContext";
import { validateStepBusiness } from "../validation/validation";
import {
  Select,
  Label,
  Button,
  Popover,
  ListBox,
  ListBoxItem,
  SelectValue,
} from "react-aria-components";
import { DatePicker } from "../components/DatePicker";

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
          <DatePicker
            label="Date of incorporation"
            value={data.business.incorporationDate}
            onChange={(value) => setBusiness({ incorporationDate: value })}
            onBlur={() => setTIncDate(true)}
            error={errors.incorporationDate}
            touched={tIncDate}
            name="incDate"
          />
        </div>
      </div>

      <h3 className="mt-6 sm:mt-8 mb-4 sm:mb-6 text-lg sm:text-xl font-semibold">
        Owner Address
      </h3>
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-3">
        <div className="flex-1 min-w-0">
          <Select
            selectedKey={data.business.ownerAddress.countryCode || null}
            onSelectionChange={(key: any) => {
              const newCode = key || "";
              setOwnerAddress({ countryCode: newCode, city: "" });
              setTOwnerCountry(true);
              setTOwnerCity(false);
            }}
            onBlur={() => setTOwnerCountry(true)}
            placeholder="Select a country"
            className="w-full"
          >
            <Label className="block mb-2 font-semibold">Country</Label>
            <Button className="w-full px-3 py-2 rounded-lg border border-black/10 dark:border-white/10 bg-white/70 dark:bg-transparent text-base text-left flex items-center justify-between">
              <SelectValue className="flex-1" />
              <span aria-hidden="true" className="text-xs ml-2">
                ▼
              </span>
            </Button>
            <Popover className="max-h-60 overflow-auto rounded-lg border border-black/10 dark:border-white/10 bg-neutral-800 shadow-lg">
              <ListBox className="p-1">
            {countries.countries.map((c: any) => (
                  <ListBoxItem
                    key={c.code}
                    id={c.code}
                    textValue={c.name}
                    className="px-3 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                  >
                {c.name}
                  </ListBoxItem>
            ))}
              </ListBox>
            </Popover>
          </Select>
          {tOwnerCountry && errors["ownerAddress.countryCode"] && (
            <div className="error mt-1">
              {errors["ownerAddress.countryCode"]}
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <Select
            selectedKey={data.business.ownerAddress.city || null}
            onSelectionChange={(key: any) => {
              setOwnerAddress({ city: key || "" });
              setTOwnerCity(true);
            }}
            onBlur={() => setTOwnerCity(true)}
            isDisabled={!data.business.ownerAddress.countryCode}
            placeholder="Select a city"
            className="w-full"
          >
            <Label className="block mb-2 font-semibold">City</Label>
            <Button className="w-full px-3 py-2 rounded-lg border border-black/10 dark:border-white/10 bg-white/70 dark:bg-transparent text-base text-left flex items-center justify-between disabled:opacity-50 disabled:cursor-not-allowed">
              <SelectValue className="flex-1" />
              <span aria-hidden="true" className="text-xs ml-2">
                ▼
              </span>
            </Button>
            <Popover className="max-h-60 overflow-auto rounded-lg border border-black/10 dark:border-white/10 bg-neutral-800 shadow-lg">
              <ListBox className="p-1">
            {ownerCities.map((c: any) => (
                  <ListBoxItem
                    key={c}
                    id={c}
                    textValue={c}
                    className="px-3 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                  >
                {c}
                  </ListBoxItem>
            ))}
              </ListBox>
            </Popover>
          </Select>
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
