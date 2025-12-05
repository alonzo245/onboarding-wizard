import { useRef, useState } from "react";
import { toast } from "react-toastify";
import { useOnboarding } from "../OnboardingContext";
import { validateStepEmail } from "../schema/validation";

export function Email() {
  const { data, setEmail, tryPrefillFromEmail } = useOnboarding();
  const [error, setError] = useState<string | null>(null);
  const lookupToastId = useRef<string | number | null>(null);

  return (
    <div className="w-full">
      <div className="w-full max-w-md sm:max-w-lg">
        <label htmlFor="email" className="block mb-2 font-semibold">
          Email
        </label>
        <input
          name="email"
          type="email"
          value={data.email}
          onChange={(e: any) => setEmail(e.target.value)}
          onBlur={async () => {
            const err = validateStepEmail(data.email);
            setError(err);
            if (err) return;
            const ok = await tryPrefillFromEmail(data.email.trim());
            if (ok) {
              toast("We prefilled some details from your email.", {
                type: ok ? "success" : "info",
                isLoading: false,
                autoClose: 3000,
                closeOnClick: true,
              });
            }
          }}
          placeholder="you@company.com"
          autoFocus
          className="w-full"
        />
        {error && <div className="error mt-2">{error}</div>}
      </div>
    </div>
  );
}
