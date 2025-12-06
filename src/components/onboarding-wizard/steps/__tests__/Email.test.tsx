import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Email } from "../Email";
import { AllTheProviders } from "../../../../test/test-utils";
import { toast } from "react-toastify";

// Mock react-toastify
vi.mock("react-toastify", () => ({
  toast: {
    loading: vi.fn(() => "toast-id"),
    update: vi.fn(),
  },
}));

describe("Email", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("does not show error initially", () => {
    render(
      <AllTheProviders>
        <Email />
      </AllTheProviders>
    );

    expect(screen.queryByText(/email is required/i)).not.toBeInTheDocument();
  });
});
