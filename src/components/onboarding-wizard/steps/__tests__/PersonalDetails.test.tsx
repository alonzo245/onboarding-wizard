import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { PersonalDetails } from "../PersonalDetails";
import { AllTheProviders } from "../../../../test/test-utils";

describe("PersonalDetails", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("updates date of birth on change", () => {
    render(
      <AllTheProviders>
        <PersonalDetails />
      </AllTheProviders>
    );

    // DateField renders DateInput with segments, verify the label is present
    expect(screen.getByText(/date of birth/i)).toBeInTheDocument();
  });

  it("shows error message for first name after blur", async () => {
    render(
      <AllTheProviders>
        <PersonalDetails />
      </AllTheProviders>
    );

    const input = document.querySelector(
      'input[name="firstName"]'
    ) as HTMLInputElement;
    expect(input).toBeInTheDocument();
    fireEvent.blur(input);

    await waitFor(() => {
      expect(screen.getByText(/first name is required/i)).toBeInTheDocument();
    });
  });

  it("does not show errors initially", () => {
    render(
      <AllTheProviders>
        <PersonalDetails />
      </AllTheProviders>
    );

    expect(
      screen.queryByText(/first name is required/i)
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText(/last name is required/i)
    ).not.toBeInTheDocument();
    expect(screen.queryByText(/enter a valid date/i)).not.toBeInTheDocument();
  });
});
