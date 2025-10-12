import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import profileReducer from "./slices/profileSlice";
import transactionsReducer from "./slices/transactionsSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import listener from "./listener";
import { profileApi } from "../services/profile";
import { transactionApi } from "../services/transactions";
import { authApi } from "../services/auth";

export const store = configureStore({
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
      authApi.middleware,
      listener.middleware
    ),
});

setupListeners(store.dispatch);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
