import { createListenerMiddleware } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { authApi } from "../services/auth";
import { profileApi } from "../services/profile";
import { transactionApi } from "../services/transactions";

export const listener = createListenerMiddleware();

// Auth success / failure
listener.startListening({
  matcher: authApi.endpoints.login.matchFulfilled,
  effect: () => {
    toast.success("Signed in successfully");
  },
});

listener.startListening({
  matcher: authApi.endpoints.login.matchRejected,
  effect: () => {
    toast.error("Sign in failed");
  },
});

listener.startListening({
  matcher: authApi.endpoints.logout.matchFulfilled,
  effect: () => {
    toast.success("Signed out");
  },
});

listener.startListening({
  matcher: authApi.endpoints.logout.matchRejected,
  effect: () => {
    toast.error("Sign out failed");
  },
});

// Profile / transactions errors
listener.startListening({
  matcher: profileApi.endpoints.getProfile.matchRejected,
  effect: () => {
    toast.error("Failed to load profile");
  },
});

listener.startListening({
  matcher: transactionApi.endpoints.getTransactions.matchRejected,
  effect: () => {
    toast.error("Failed to load transactions");
  },
});

export default listener;
