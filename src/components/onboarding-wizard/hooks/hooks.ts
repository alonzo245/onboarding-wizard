import { fetchUserByEmail } from "../../../../mocks/api";
import { toast } from "react-toastify";
import { useOnboarding } from "../context/OnboardingContext";

export function usePrefillFromEmail() {
  const { setEmail, setPersonal, setBusiness, data } = useOnboarding();

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

      const firstName = pickStringCI(["firstName", "first_name", "firstname"]);
      const lastName = pickStringCI(["lastName", "last_name", "lastname"]);
      const businessName = pickStringCI([
        "businessName",
        "BusinessName",
        "business_name",
      ]);

      const found = Boolean(firstName || lastName || businessName);

      setEmail(email);

      if (firstName || lastName) {
        setPersonal({
          firstName: firstName ?? data.personal.firstName,
          lastName: lastName ?? data.personal.lastName,
        });
      }

      if (businessName) {
        setBusiness({
          businessName: businessName ?? data.business.businessName,
        });
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
