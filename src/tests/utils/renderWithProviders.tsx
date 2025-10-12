import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router";
import { configureStore } from "@reduxjs/toolkit";
import type { RootState } from "@/store/store";
import authReducer from "@/store/slices/authSlice";
import profileReducer from "@/store/slices/profileSlice";
import transactionsReducer from "@/store/slices/transactionsSlice";
import { profileApi } from "@/services/profile";
import { transactionApi } from "@/services/transactions";
import { authApi } from "@/services/auth";
import "@testing-library/jest-dom/vitest";

// Create a test store similar to your real store but with mock preloaded state
export function createTestStore(preloadedState?: Partial<RootState>) {
  return configureStore({
    reducer: {
      auth: authReducer,
      profile: profileReducer,
      transactions: transactionsReducer,
      [profileApi.reducerPath]: profileApi.reducer,
      [transactionApi.reducerPath]: transactionApi.reducer,
      [authApi.reducerPath]: authApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
        profileApi.middleware,
        transactionApi.middleware,
        authApi.middleware
      ),
    preloadedState: preloadedState as RootState,
  });
}

// 🧪 Helper to render components with Redux + Router context
export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState,
    store = createTestStore(preloadedState),
    route = "/",
  }: {
    preloadedState?: Partial<RootState>;
    store?: ReturnType<typeof createTestStore>;
    route?: string;
  } = {}
) {
  window.history.pushState({}, "Test page", route);

  return {
    store,
    ...render(
      <Provider store={store}>
        <BrowserRouter>{ui}</BrowserRouter>
      </Provider>
    ),
  };
}
