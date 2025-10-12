import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi, describe, test, expect } from "vitest";
import { BrowserRouter } from "react-router";
import Login from "@/pages/Login";


// --- Mock navigate ---
const mockNavigate = vi.fn();
vi.mock("react-router", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...(actual as object),
    useNavigate: () => mockNavigate,
  };
});
const mockLogin = vi.fn();

vi.mock("@/services/auth", () => ({
  useLoginMutation: vi.fn(() => [
    (args: { username: string; password: string }) => ({
      unwrap: () => mockLogin(args),
    }),
    { isLoading: false, error: null, reset: vi.fn() },
  ]),
}));
describe("Login form", () => {
  test("renders and validates", async () => {
    const user = userEvent.setup();
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    expect(screen.getByText(/welcome back/i)).toBeInTheDocument();

    const username = screen.getByPlaceholderText("jane.dev");
    const password = screen.getByPlaceholderText("••••••••");
    const submit = screen.getByRole("button", { name: /sign in/i });

    await user.click(submit);
    expect(await screen.findByText(/username is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/password is required/i)).toBeInTheDocument();

    await user.type(username, "jane");
    await user.type(password, "password123");

    const toggle = screen.getByLabelText(/show password/i);
    await user.click(toggle);

    expect((password as HTMLInputElement).type).toBe("text");
    expect((username as HTMLInputElement).value).toBe("jane");
    expect((password as HTMLInputElement).value).toBe("password123");
  });

  test("submits form", async () => {
    const user = userEvent.setup();
    mockLogin.mockResolvedValueOnce({
      token: "token",
      user: { id: "1", username: "jane" },
    });

    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    const username = screen.getByPlaceholderText("jane.dev");
    const password = screen.getByPlaceholderText("••••••••");
    const submit = screen.getByRole("button", { name: /sign in/i });

    await user.type(username, "jane");
    await user.type(password, "password123");
    await user.click(submit);

    expect(mockLogin).toHaveBeenCalledWith({
      username: "jane",
      password: "password123",
    });

    // Verify navigate called after unwrap resolves
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/dashboard");
    });

  });
});
