import { screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import Dashboard from "@/pages/Dashboard";
import { renderWithProviders } from "@/tests/utils/renderWithProviders";

describe("Dashboard", () => {
  test("renders profile and transactions correctly", async () => {
    const preloadedState = {
      auth: {
        user: { id: "1", username: "jane", token: "fake-token" },
        token: "fake-token",
      },
      profile: {
        id: 1,
        userId: 1,
        name: "Jane Doe",
        email: "jane@example.com",
      },
      transactions: {
        items: [
          {
            id: "1",
            userId: "1",
            description: "Coffee",
            amount: 50,
            date: "2025-10-08T10:12:00Z",
          },
          {
            id: "2",
            userId: "1",
            description: "Salary",
            amount: 2000,
            date: "2025-10-08T12:45:00Z",
          },
        ],
      },
    };

    const { store } = renderWithProviders(<Dashboard />, { preloadedState });

    expect(screen.getAllByText(/Jane Doe/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/jane@example\.com/i)).toBeInTheDocument();
    expect(screen.getByText(/Coffee/i)).toBeInTheDocument();
    expect(screen.getByText(/Salary/i)).toBeInTheDocument();

    const state = store.getState();
    expect(state.auth.user?.username).toBe("jane");
  });
});
