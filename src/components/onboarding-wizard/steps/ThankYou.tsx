import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useOnboarding } from "../context/OnboardingContext";
import confetti from "canvas-confetti";
import type { OnboardingData } from "../types/types";
import { SUBMITTED_DATA_KEY } from "../config/config";

export function ThankYou() {
  const nav = useNavigate();
  const { data: contextData, countries } = useOnboarding();
  const [data, setData] = useState<OnboardingData>(contextData);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (
      contextData.email ||
      contextData.personal.firstName ||
      contextData.business.businessName
    ) {
      setData(contextData);
    } else if (typeof localStorage !== "undefined") {
      try {
        const saved = localStorage.getItem(SUBMITTED_DATA_KEY);
        if (saved) {
          const parsed = JSON.parse(saved) as OnboardingData;
          setData(parsed);
        }
      } catch {}
    }
  }, []);

  useEffect(() => {
    const duration = 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ["#3a3", "#4a4", "#5a5"],
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ["#3a3", "#4a4", "#5a5"],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  }, []);

  const countryName = (code: string) =>
    countries.countries.find((c: any) => c.code === code)?.name ?? code;

  return (
    <div className="w-full px-4 sm:px-6 py-1 sm:py-4 max-w-2xl mx-auto">
      <div className="text-center mb-4 sm:mb-4">
        <h1 className="mt-0 mb-1 sm:mb-2 text-2xl sm:text-3xl font-bold text-[#3a3]">
          Thank You!
        </h1>
        <p className="text-base sm:text-lg mb-0">
          Your application has been successfully submitted.
        </p>
      </div>

      <div className="space-y-4 sm:space-y-6 mb-6 sm:mb-8">
        <section>
          <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">
            Email
          </h3>
          <dl>
            <dt>Email</dt>
            <dd>{data.email || "—"}</dd>
          </dl>
        </section>

        <section>
          <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">
            Personal Details
          </h3>
          <dl>
            <dt>First name</dt>
            <dd>{data.personal.firstName || "—"}</dd>
            <dt>Last name</dt>
            <dd>{data.personal.lastName || "—"}</dd>
            <dt>Date of birth</dt>
            <dd>{data.personal.dateOfBirth || "—"}</dd>
          </dl>
        </section>

        <section>
          <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">
            Home Address
          </h3>
          <dl>
            <dt>Country</dt>
            <dd>{countryName(data.homeAddress.countryCode) || "—"}</dd>
            <dt>City</dt>
            <dd>{data.homeAddress.city || "—"}</dd>
            <dt>Street</dt>
            <dd>{data.homeAddress.street || "—"}</dd>
            <dt>House number</dt>
            <dd>{data.homeAddress.houseNumber || "—"}</dd>
            <dt>Postal code</dt>
            <dd>{data.homeAddress.postalCode || "—"}</dd>
          </dl>
        </section>

        <section>
          <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">
            Business Details
          </h3>
          <dl>
            <dt>Business name</dt>
            <dd>{data.business.businessName || "—"}</dd>
            <dt>Date of incorporation</dt>
            <dd>{data.business.incorporationDate || "—"}</dd>
          </dl>
          <h4 className="text-base sm:text-lg font-semibold mt-3 sm:mt-4 mb-2 sm:mb-3">
            Owner Address
          </h4>
          <dl>
            <dt>Country</dt>
            <dd>
              {countryName(data.business.ownerAddress.countryCode) || "—"}
            </dd>
            <dt>City</dt>
            <dd>{data.business.ownerAddress.city || "—"}</dd>
            <dt>Street</dt>
            <dd>{data.business.ownerAddress.street || "—"}</dd>
            <dt>House number</dt>
            <dd>{data.business.ownerAddress.houseNumber || "—"}</dd>
            <dt>Postal code</dt>
            <dd>{data.business.ownerAddress.postalCode || "—"}</dd>
          </dl>
        </section>
      </div>

      <div className="text-center">
        <button
          onClick={() => {
            try {
              if (typeof localStorage !== "undefined") {
                localStorage.removeItem(SUBMITTED_DATA_KEY);
              }
            } catch {}
            nav("/onboarding/email");
          }}
          className="bg-[#3a3] text-white border-none px-6 py-3 rounded-lg text-sm sm:text-base cursor-pointer font-medium w-full sm:w-auto"
        >
          Back To Homepage
        </button>
      </div>
    </div>
  );
}
