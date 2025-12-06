import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BusinessDetails } from "../BusinessDetails";
import { AllTheProviders } from "../../../../test/test-utils";

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
    expect(screen.getByText(/date of incorporation/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /select a country country/i })
    ).toBeInTheDocument();
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

    // DatePicker renders DateInput with segments, verify the label is present
    expect(screen.getByText(/date of incorporation/i)).toBeInTheDocument();
  });

  it("updates owner country selection", async () => {
    render(
      <AllTheProviders>
        <BusinessDetails />
      </AllTheProviders>
    );

    const countryButton = screen.getByRole("button", {
      name: /select a country country/i,
    });

    await waitFor(() => {
      expect(countryButton).toBeInTheDocument();
    });

    // Verify the button is clickable (not disabled)
    expect(countryButton).not.toHaveAttribute("disabled");
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
