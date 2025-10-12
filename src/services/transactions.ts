import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setTransactions, type Transaction } from "@/store/slices/transactionsSlice";
import { ENV_VARIABLES } from "@/config/env";
import type { RootState } from "@/store/store";
export const transactionApi = createApi({
  reducerPath: "transactionApi",
  baseQuery: fetchBaseQuery({
    baseUrl: ENV_VARIABLES.API_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getTransaction: builder.query<Transaction, string>({
      query: (id) => `transactions/${id}`,
    }),
    getTransactions: builder.query<Transaction[], void>({
      query: () => "transactions",
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setTransactions(data));
        } catch (error) {
          console.error("Failed to fetch transactions:", error);
        }
      },
    }),
  }),
});

export const { useGetTransactionQuery, useGetTransactionsQuery } =
  transactionApi;
