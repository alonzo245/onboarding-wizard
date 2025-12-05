import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { HomeAddress } from "./HomeAddress";
import { AllTheProviders } from "../../../test/test-utils";

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
      screen.getByRole("combobox", { name: /country/i })
    ).toBeInTheDocument();
    expect(screen.getByRole("combobox", { name: /city/i })).toBeInTheDocument();
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

    const select = screen.getByRole("combobox", {
      name: /country/i,
    }) as HTMLSelectElement;

    await waitFor(() => {
      expect(select.options.length).toBeGreaterThan(1);
    });

    fireEvent.change(select, { target: { value: "US" } });
    expect(select.value).toBe("US");
  });

  it("enables city select when country is selected", async () => {
    render(
      <AllTheProviders>
        <HomeAddress />
      </AllTheProviders>
    );

    const countrySelect = screen.getByRole("combobox", { name: /country/i });
    const citySelect = document.querySelector(
      'select[id="city"]'
    ) as HTMLSelectElement;

    await waitFor(() => {
      const options = countrySelect.querySelectorAll("option");
      expect(options.length).toBeGreaterThan(1);
    });

    fireEvent.change(countrySelect, { target: { value: "US" } });

    await waitFor(() => {
      expect(citySelect.disabled).toBe(false);
    });
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
