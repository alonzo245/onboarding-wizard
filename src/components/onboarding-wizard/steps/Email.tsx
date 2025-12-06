import { useState } from "react";
import { useOnboarding } from "../context/OnboardingContext";
import { usePrefillFromEmail } from "../hooks/hooks";
import { validateStepEmail } from "../validation/validation";

export function Email() {
  const { data, setEmail } = useOnboarding();
  const tryPrefillFromEmail = usePrefillFromEmail();
  const [error, setError] = useState<string | null>(null);

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
            await tryPrefillFromEmail(data.email.trim());
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
