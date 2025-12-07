import { Link } from "react-router-dom";
import { useOnboarding } from "../context/OnboardingContext";
import { useEffect } from "react";

export function ReviewSubmit() {
  const { data, countries } = useOnboarding();

  const countryName = (code: string) =>
    countries.countries.find((c: any) => c.code === code)?.name ?? code;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div>
      <h2 style={{ marginTop: 0 }}>Review & Submit</h2>

      <section style={{ marginBottom: 20 }}>
        <h3>
          Email{" "}
          <small>
            <Link to="/onboarding/email">Edit</Link>
          </small>
        </h3>
        <dl>
          <dt>Email</dt>
          <dd>{data.email || "—"}</dd>
        </dl>
      </section>

      <section style={{ marginBottom: 20 }}>
        <h3>
          Personal Details{" "}
          <small>
            <Link to="/onboarding/personal">Edit</Link>
          </small>
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

      <section style={{ marginBottom: 20 }}>
        <h3>
          Home Address{" "}
          <small>
            <Link to="/onboarding/home-address">Edit</Link>
          </small>
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

      <section style={{ marginBottom: 20 }}>
        <h3>
          Business Details{" "}
          <small>
            <Link to="/onboarding/business">Edit</Link>
          </small>
        </h3>
        <dl>
          <dt>Business name</dt>
          <dd>{data.business.businessName || "—"}</dd>
          <dt>Date of incorporation</dt>
          <dd>{data.business.incorporationDate || "—"}</dd>
        </dl>
        <h4>Owner Address</h4>
        <dl>
          <dt>Country</dt>
          <dd>{countryName(data.business.ownerAddress.countryCode) || "—"}</dd>
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
  );
}
