import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ENV_VARIABLES } from "@/config/env";
import type { User } from "@/utils/types";
import {
  clearAuth,
  setToken,
  setUser,
} from "@/store/slices/authSlice";
import { clearProfile } from "@/store/slices/profileSlice";
import { clearTransactions } from "@/store/slices/transactionsSlice";

export interface LoginParams {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: ENV_VARIABLES.API_BASE_URL,
  }),
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginParams>({
      query: (credentials) => ({
        url: "login",
        method: "POST",
        body: credentials,
      }),
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setToken(data.token));
          dispatch(setUser({ id: data.user.id, username: data.user.username }));
        } catch (error) {
          console.error("Login failed:", error);
        }
      },
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: "logout",
        method: "POST",
      }),
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(clearAuth());
          dispatch(clearProfile());
          dispatch(clearTransactions());
        } catch (error) {
          console.error("Logout failed:", error);
        }
      },
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation } = authApi;
