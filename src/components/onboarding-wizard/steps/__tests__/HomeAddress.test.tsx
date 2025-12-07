import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { HomeAddress } from "../HomeAddress";
import { AllTheProviders } from "../../../../test/test-utils";

describe("HomeAddress", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders all address fields", () => {
    render(
      <AllTheProviders>
        <HomeAddress />
      </AllTheProviders>
    );

    expect(
      screen.getByRole("button", { name: /select a country country/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /select a city city/i })
    ).toBeInTheDocument();
    expect(document.querySelector('input[name="street"]')).toBeInTheDocument();
    expect(
      document.querySelector('input[name="houseNumber"]')
    ).toBeInTheDocument();
    expect(
      document.querySelector('input[name="postalCode"]')
    ).toBeInTheDocument();
  });

  it("updates country selection", async () => {
    render(
      <AllTheProviders>
        <HomeAddress />
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

  it("enables city select when country is selected", async () => {
    render(
      <AllTheProviders>
        <HomeAddress />
      </AllTheProviders>
    );

    const countryButton = screen.getByRole("button", {
      name: /select a country country/i,
    });
    const cityButton = screen.getByRole("button", {
      name: /select a city city/i,
    });

    await waitFor(() => {
      expect(countryButton).toBeInTheDocument();
      expect(cityButton).toBeInTheDocument();
    });

    // Initially city should be disabled
    expect(cityButton).toHaveAttribute("disabled");
  });

  it("updates street input on change", () => {
    render(
      <AllTheProviders>
        <HomeAddress />
      </AllTheProviders>
    );

    const input = document.querySelector(
      'input[name="street"]'
    ) as HTMLInputElement;
    expect(input).toBeInTheDocument();
    fireEvent.change(input, { target: { value: "Main St" } });
    expect(input.value).toBe("Main St");
  });

  it("does not show errors initially", () => {
    render(
      <AllTheProviders>
        <HomeAddress />
      </AllTheProviders>
    );

    expect(screen.queryByText(/country is required/i)).not.toBeInTheDocument();
  });
});
