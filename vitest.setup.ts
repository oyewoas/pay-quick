import { afterEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";

// 🧹 Clean up DOM after each test
afterEach(() => {
  cleanup();
});

// Mock RTK Query services (so tests don't hit the real API)
vi.mock("@/services/profile", async (importOriginal) => {
  const actual = await importOriginal<typeof import("./src/services/profile")>();
  return {
    ...actual,
    useGetProfileQuery: () => ({
      data: { id: 1, userId: 1, name: "Jane Doe", email: "jane@example.com" },
      isLoading: false,
      isError: false,
    }),
  };
});

vi.mock("@/services/transactions", async (importOriginal) => {
  const actual = await importOriginal<typeof import("./src/services/transactions")>();
  return {
    ...actual,
    useGetTransactionsQuery: () => ({
      data: [
        {
          id: "1",
          userId: 1,
          description: "Coffee",
          amount: -4.5,
          date: "2025-10-08T10:12:00Z",
        },
        {
          id: "2",
          userId: 1,
          description: "Salary",
          amount: 2000,
          date: "2025-10-08T12:45:00Z",
        },
      ],
      isLoading: false,
      isError: false,
    }),
  };
});
