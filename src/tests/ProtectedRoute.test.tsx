import { screen } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import { renderWithProviders } from "@/tests/utils/renderWithProviders";
import ProtectedRoute from "@/components/ProtectedRoute";
import "@testing-library/jest-dom/vitest";

describe("ProtectedRoute", () => {
  test("redirects to /login when no token", async () => {
    renderWithProviders(
      <ProtectedRoute>
        <div>Private Content</div>
      </ProtectedRoute>,
      {
        preloadedState: { auth: { token: null, user: null } },
      }
    );

    // Should not show protected content
    expect(screen.queryByText(/Private Content/i)).not.toBeInTheDocument();
  });

  test("renders children when token exists", () => {
    renderWithProviders(
      <ProtectedRoute>
        <div>Private Content</div>
      </ProtectedRoute>,
      {
        preloadedState: {
          auth: { token: "fake-token", user: { id: "1", username: "jane" } },
        },
      }
    );

    expect(screen.getByText(/Private Content/i)).toBeInTheDocument();
  });
});
