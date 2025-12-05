import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BusinessDetails } from "./BusinessDetails";
import { AllTheProviders } from "../../../test/test-utils";

describe("BusinessDetails", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders all business detail fields", () => {
    render(
      <AllTheProviders>
        <BusinessDetails />
      </AllTheProviders>
    );

    expect(
      document.querySelector('input[name="businessName"]')
    ).toBeInTheDocument();
    expect(document.querySelector('input[name="incDate"]')).toBeInTheDocument();
    expect(
      screen.getAllByRole("combobox", { name: /country/i }).length
    ).toBeGreaterThan(0);
  });

  it("updates business name on change", () => {
    render(
      <AllTheProviders>
        <BusinessDetails />
      </AllTheProviders>
    );

    const input = document.querySelector(
      'input[name="businessName"]'
    ) as HTMLInputElement;
    expect(input).toBeInTheDocument();
    fireEvent.change(input, { target: { value: "Acme Corp" } });
    expect(input.value).toBe("Acme Corp");
  });

  it("updates incorporation date on change", () => {
    render(
      <AllTheProviders>
        <BusinessDetails />
      </AllTheProviders>
    );

    const input = document.querySelector(
      'input[name="incDate"]'
    ) as HTMLInputElement;
    expect(input).toBeInTheDocument();
    fireEvent.change(input, { target: { value: "2020-01-01" } });
    expect(input.value).toBe("2020-01-01");
  });

  it("updates owner country selection", async () => {
    render(
      <AllTheProviders>
        <BusinessDetails />
      </AllTheProviders>
    );

    const selects = screen.getAllByRole("combobox", { name: /country/i });
    const ownerCountrySelect = selects[selects.length - 1] as HTMLSelectElement;

    await waitFor(() => {
      expect(ownerCountrySelect.options.length).toBeGreaterThan(1);
    });

    fireEvent.change(ownerCountrySelect, { target: { value: "US" } });
    expect(ownerCountrySelect.value).toBe("US");
  });

  it("does not show errors initially", () => {
    render(
      <AllTheProviders>
        <BusinessDetails />
      </AllTheProviders>
    );

    expect(
      screen.queryByText(/business name is required/i)
    ).not.toBeInTheDocument();
  });
});
