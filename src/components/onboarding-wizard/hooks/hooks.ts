import { fetchUserByEmail } from "../../../../mocks/api";
import { toast } from "react-toastify";
import { useOnboarding } from "../context/OnboardingContext";
import type { Address } from "../types/types";

export function usePrefillFromEmail() {
  const {
    setEmail,
    setPersonal,
    setBusiness,
    setHomeAddress,
    setOwnerAddress,
    data,
  } = useOnboarding();

  const tryPrefillFromEmail = async (email: string): Promise<boolean> => {
    try {
      const result = await fetchUserByEmail(email);
      if (!result || typeof result !== "object") return false;
      const obj = result as Record<string, unknown>;

      const pickStringCI = (keys: string[]): string | undefined => {
        const key = Object.keys(obj).find((k) =>
          keys.some((t) => t.toLowerCase() === k.toLowerCase())
        );
        const v = key ? obj[key] : undefined;
        return typeof v === "string" ? v : undefined;
      };

      const pickObjectCI = (
        keys: string[]
      ): Record<string, unknown> | undefined => {
        const key = Object.keys(obj).find((k) =>
          keys.some((t) => t.toLowerCase() === k.toLowerCase())
        );
        const v = key ? obj[key] : undefined;
        return typeof v === "object" && v !== null && !Array.isArray(v)
          ? (v as Record<string, unknown>)
          : undefined;
      };

      const firstName = pickStringCI(["firstName", "first_name", "firstname"]);
      const lastName = pickStringCI(["lastName", "last_name", "lastname"]);
      const dateOfBirth = pickStringCI(["dateOfBirth", "date_of_birth", "dob"]);
      const businessName = pickStringCI([
        "businessName",
        "BusinessName",
        "business_name",
      ]);
      const incorporationDate = pickStringCI([
        "incorporationDate",
        "incorporation_date",
      ]);
      const homeAddress = pickObjectCI(["homeAddress", "home_address"]);
      const ownerAddress = pickObjectCI([
        "ownerAddress",
        "owner_address",
        "businessAddress",
        "business_address",
      ]);

      const found = Boolean(
        firstName ||
          lastName ||
          dateOfBirth ||
          businessName ||
          incorporationDate ||
          homeAddress ||
          ownerAddress
      );

      setEmail(email);

      if (firstName || lastName || dateOfBirth) {
        setPersonal({
          firstName: firstName ?? data.personal.firstName,
          lastName: lastName ?? data.personal.lastName,
          dateOfBirth: dateOfBirth ?? data.personal.dateOfBirth,
        });
      }

      if (homeAddress) {
        const address: Partial<Address> = {};
        const addressKeys: (keyof Address)[] = [
          "countryCode",
          "city",
          "street",
          "houseNumber",
          "postalCode",
        ];
        addressKeys.forEach((key) => {
          const variants = [
            key,
            key.toLowerCase(),
            key.replace(/([A-Z])/g, "_$1").toLowerCase(),
          ];
          const foundKey = Object.keys(homeAddress).find((k) =>
            variants.some((t) => t.toLowerCase() === k.toLowerCase())
          );
          if (foundKey) {
            const value = homeAddress[foundKey];
            if (typeof value === "string") {
              address[key] = value;
            }
          }
        });
        setHomeAddress(address);
      }

      if (businessName || incorporationDate) {
        const businessUpdates: any = {};
        if (businessName) {
          businessUpdates.businessName = businessName;
        }
        if (incorporationDate) {
          businessUpdates.incorporationDate = incorporationDate;
        }
        if (Object.keys(businessUpdates).length > 0) {
          setBusiness(businessUpdates);
        }
      }

      if (ownerAddress) {
        const address: Partial<Address> = {};
        const addressKeys: (keyof Address)[] = [
          "countryCode",
          "city",
          "street",
          "houseNumber",
          "postalCode",
        ];
        addressKeys.forEach((key) => {
          const variants = [
            key,
            key.toLowerCase(),
            key.replace(/([A-Z])/g, "_$1").toLowerCase(),
          ];
          const foundKey = Object.keys(ownerAddress).find((k) =>
            variants.some((t) => t.toLowerCase() === k.toLowerCase())
          );
          if (foundKey) {
            const value = ownerAddress[foundKey];
            if (typeof value === "string") {
              address[key] = value;
            }
          }
        });
        setOwnerAddress(address);
      }

      if (found) {
        toast("We prefilled some details from your email.", {
          type: "success",
          isLoading: false,
          autoClose: 3000,
          closeOnClick: true,
        });
      }

      return found;
    } catch {
      return false;
    }
  };

  return tryPrefillFromEmail;
}
