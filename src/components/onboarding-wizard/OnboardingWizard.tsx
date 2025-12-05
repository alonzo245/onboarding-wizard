import { Outlet, useLocation, Link, useNavigate } from "react-router-dom";
import { StepperNav } from "./Header";
import { Footer } from "./Footer";
import { useOnboarding } from "./OnboardingContext";
import {
  validateStepEmail,
  validateStepPersonal,
  validateStepAddress,
  validateStepBusiness,
} from "./schema/validation";

const steps = [
  { path: "/onboarding/email", label: "Email" },
  { path: "/onboarding/personal", label: "Personal Details" },
  { path: "/onboarding/home-address", label: "Home Address" },
  { path: "/onboarding/business", label: "Business Details" },
  { path: "/onboarding/review", label: "Review & Submit" },
];

export function OnboardingWizard() {
  const { pathname } = useLocation();
  const nav = useNavigate();
  const {
    data,
    setEmail,
    setPersonal,
    setHomeAddress,
    setBusiness,
    setOwnerAddress,
    tryPrefillFromEmail,
    furthestStep,
    setFurthestStep,
    countries,
    submit,
  } = useOnboarding();
  const currentIdx = Math.max(
    0,
    steps.findIndex((s) => pathname.startsWith(s.path))
  );

  const blurCurrentFields = () => {
    const host = document.getElementById("wizard-content");
    if (!host) return;
    const fields = host.querySelectorAll("input, select, textarea");
    fields.forEach((el) => {
      try {
        el.dispatchEvent(new Event("blur", { bubbles: true }));
      } catch {}
    });
  };

  const goBack = () => {
    if (currentIdx <= 0) return;
    nav(steps[currentIdx - 1].path);
  };

  // Extracted handlers per step for readability
  const handleEmailNext = async (): Promise<boolean> => {
    const ok = validateStepEmail(data.email) === null;
    if (!ok) return false;
    setEmail(data.email.trim());
    await tryPrefillFromEmail(data.email.trim());
    if (furthestStep < 1) setFurthestStep(1);
    return true;
  };

  const handlePersonalNext = (): boolean => {
    const errs = validateStepPersonal(data.personal);
    const ok = Object.keys(errs).length === 0;
    if (!ok) return false;
    setPersonal({
      firstName: data.personal.firstName.trim(),
      lastName: data.personal.lastName.trim(),
      dateOfBirth: data.personal.dateOfBirth,
    });
    if (furthestStep < 2) setFurthestStep(2);
    return true;
  };

  const handleHomeAddressNext = (): boolean => {
    const errs = validateStepAddress(data.homeAddress, countries.countries);
    const ok = Object.keys(errs).length === 0;
    if (!ok) return false;
    setHomeAddress({
      countryCode: data.homeAddress.countryCode,
      city: data.homeAddress.city,
      street: data.homeAddress.street.trim(),
      houseNumber: data.homeAddress.houseNumber.trim(),
      postalCode: data.homeAddress.postalCode.trim(),
    });
    if (furthestStep < 3) setFurthestStep(3);
    return true;
  };

  const handleBusinessNext = (): boolean => {
    const errs = validateStepBusiness(data.business, countries.countries);
    const ok = Object.keys(errs).length === 0;
    if (!ok) return false;
    setBusiness({
      businessName: data.business.businessName.trim(),
      incorporationDate: data.business.incorporationDate,
    });
    setOwnerAddress({
      countryCode: data.business.ownerAddress.countryCode,
      city: data.business.ownerAddress.city,
      street: data.business.ownerAddress.street.trim(),
      houseNumber: data.business.ownerAddress.houseNumber.trim(),
      postalCode: data.business.ownerAddress.postalCode.trim(),
    });
    if (furthestStep < 4) setFurthestStep(4);
    return true;
  };

  const goNext = async () => {
    if (currentIdx >= steps.length - 1) {
      const result = await submit();
      if (result.ok) {
        nav("/onboarding/thank-you");
      }
      return;
    }
    const stepPath = steps[currentIdx].path;
    let ok = true;
    if (stepPath === "/onboarding/email") {
      ok = await handleEmailNext();
    } else if (stepPath === "/onboarding/personal") {
      ok = handlePersonalNext();
    } else if (stepPath === "/onboarding/home-address") {
      ok = handleHomeAddressNext();
    } else if (stepPath === "/onboarding/business") {
      ok = handleBusinessNext();
    }
    if (!ok) {
      blurCurrentFields();
      window.dispatchEvent(new CustomEvent("wizard:validate-attempt"));
      return;
    }
    nav(steps[currentIdx + 1].path);
  };

  return (
    <>
      <div className="container px-4 sm:px-6">
        <header className="flex items-center mb-4 sm:mb-6">
          <Link to="/onboarding/email" className="no-underline text-inherit">
            <h1 className="m-0 text-lg sm:text-xl font-semibold">
              Onboarding Wizard
            </h1>
          </Link>
        </header>
        {pathname !== "/onboarding/thank-you" && (
          <div className="card mb-4 sm:mb-6 p-3 sm:p-5">
            <StepperNav steps={steps} activePath={pathname} />
          </div>
        )}
        <div className="card p-8 " id="wizard-content">
          <Outlet />
        </div>
        {pathname !== "/onboarding/thank-you" && (
          <Footer
            onBack={goBack}
            onNext={goNext}
            currentStep={currentIdx}
            totalSteps={steps.length}
            isLoading={countries.loading}
            isLastStep={currentIdx === steps.length - 1}
          />
        )}
      </div>
    </>
  );
}
