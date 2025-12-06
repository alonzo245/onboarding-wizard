import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { ThankYou } from "../ThankYou";
import { AllTheProviders } from "../../../../test/test-utils";

// Mock canvas-confetti
vi.mock("canvas-confetti", () => ({
  default: vi.fn(),
}));

describe("ThankYou", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Clear localStorage
    localStorage.clear();
  });

  it("renders thank you heading", () => {
    render(
      <AllTheProviders>
        <ThankYou />
      </AllTheProviders>
    );

    expect(screen.getByText(/thank you!/i)).toBeInTheDocument();
  });

  it("displays success message", () => {
    render(
      <AllTheProviders>
        <ThankYou />
      </AllTheProviders>
    );

    expect(
      screen.getByText(/your application has been successfully submitted/i)
    ).toBeInTheDocument();
  });

  it("displays email section", () => {
    render(
      <AllTheProviders>
        <ThankYou />
      </AllTheProviders>
    );

    expect(screen.getAllByText(/email/i).length).toBeGreaterThan(0);
  });

  it("displays personal details section", () => {
    render(
      <AllTheProviders>
        <ThankYou />
      </AllTheProviders>
    );

    expect(screen.getByText(/personal details/i)).toBeInTheDocument();
    expect(screen.getByText(/first name/i)).toBeInTheDocument();
    expect(screen.getByText(/last name/i)).toBeInTheDocument();
    expect(screen.getByText(/date of birth/i)).toBeInTheDocument();
  });

  it("displays home address section", () => {
    render(
      <AllTheProviders>
        <ThankYou />
      </AllTheProviders>
    );

    expect(screen.getByText(/home address/i)).toBeInTheDocument();
    expect(screen.getAllByText(/country/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/city/i).length).toBeGreaterThan(0);
  });

  it("displays business details section", () => {
    render(
      <AllTheProviders>
        <ThankYou />
      </AllTheProviders>
    );

    expect(screen.getByText(/business details/i)).toBeInTheDocument();
    expect(screen.getByText(/business name/i)).toBeInTheDocument();
    expect(screen.getByText(/owner address/i)).toBeInTheDocument();
  });

  it("renders back to homepage button", () => {
    render(
      <AllTheProviders>
        <ThankYou />
      </AllTheProviders>
    );

    expect(screen.getByText(/back to homepage/i)).toBeInTheDocument();
  });

  it("shows placeholder for empty values", async () => {
    render(
      <AllTheProviders>
        <ThankYou />
      </AllTheProviders>
    );

    await waitFor(() => {
      const placeholders = screen.getAllByText("—");
      expect(placeholders.length).toBeGreaterThan(0);
    });
  });
});

