import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { ReviewSubmit } from "../ReviewSubmit";
import { AllTheProviders } from "../../../../test/test-utils";

describe("ReviewSubmit", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders review section with heading", () => {
    render(
      <AllTheProviders>
        <ReviewSubmit />
      </AllTheProviders>
    );

    expect(screen.getByText(/review & submit/i)).toBeInTheDocument();
  });

  it("displays email section with edit link", () => {
    render(
      <AllTheProviders>
        <ReviewSubmit />
      </AllTheProviders>
    );

    expect(screen.getAllByText(/email/i).length).toBeGreaterThan(0);
    const editLinks = screen.getAllByText(/edit/i);
    expect(editLinks.length).toBeGreaterThan(0);
  });

  it("displays personal details section", () => {
    render(
      <AllTheProviders>
        <ReviewSubmit />
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
        <ReviewSubmit />
      </AllTheProviders>
    );

    expect(screen.getByText(/home address/i)).toBeInTheDocument();
    expect(screen.getAllByText(/country/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/city/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/street/i).length).toBeGreaterThan(0);
  });

  it("displays business details section", () => {
    render(
      <AllTheProviders>
        <ReviewSubmit />
      </AllTheProviders>
    );

    expect(screen.getByText(/business details/i)).toBeInTheDocument();
    expect(screen.getByText(/business name/i)).toBeInTheDocument();
    expect(screen.getByText(/date of incorporation/i)).toBeInTheDocument();
    expect(screen.getByText(/owner address/i)).toBeInTheDocument();
  });

  it("shows placeholder for empty values", async () => {
    render(
      <AllTheProviders>
        <ReviewSubmit />
      </AllTheProviders>
    );

    await waitFor(() => {
      const placeholders = screen.getAllByText("—");
      expect(placeholders.length).toBeGreaterThan(0);
    });
  });
});
