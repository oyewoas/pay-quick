import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi, describe, test, expect } from "vitest";
import Header from "@/components/Header";
import { renderWithProviders } from "@/tests/utils/renderWithProviders";

// --- Mocks ---
const mockNavigate = vi.fn();
const mockLogout = vi.fn();

// Mock react-router navigate
vi.mock("react-router", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...(actual as object),
    useNavigate: () => mockNavigate,
  };
});

// Mock logout mutation (RTK Query)
vi.mock("@/services/auth", async (importOriginal) => ({
  ...(await importOriginal()),
  useLoginMutation: vi.fn(() => [
    (args: { username: string; password: string }) => ({
      unwrap: () => vi.fn()(args),
    }),
    { isLoading: false, error: null, reset: vi.fn() },
  ]),
  useLogoutMutation: vi.fn(() => [() => ({ unwrap: mockLogout })]),
}));

describe("Header component", () => {
  test("renders user info correctly", () => {
    const preloadedState = {
      profile: {
        name: "Jane Doe",
        email: "jane@example.com",
      },
    };

    renderWithProviders(<Header title="Dashboard" />, { preloadedState });

    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    expect(screen.getByText("Jane Doe")).toBeInTheDocument();
    expect(screen.getByText("JD")).toBeInTheDocument();
  });

  test("calls logout and navigates to login", async () => {
    const user = userEvent.setup();
    const preloadedState = {
      profile: {
        name: "Jane Doe",
        email: "jane@example.com",
      },
    };

    mockLogout.mockResolvedValueOnce({});

    renderWithProviders(<Header title="Dashboard" />, { preloadedState });

    const logoutButton = screen.getByTitle("Logout");
    await user.click(logoutButton);

    await waitFor(() => {
      expect(mockLogout).toHaveBeenCalledTimes(1);
      expect(mockNavigate).toHaveBeenCalledWith("/login");
    });
  });
});
