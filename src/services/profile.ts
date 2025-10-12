import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Profile } from "@/utils/types";
import { ENV_VARIABLES } from "@/config/env";
import type { RootState } from "@/store/store";
import { setProfile } from "@/store/slices/profileSlice";
export const profileApi = createApi({
  reducerPath: "profileApi",
  baseQuery: fetchBaseQuery({
    baseUrl: ENV_VARIABLES.API_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      // Get token from Redux store
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getProfile: builder.query<Profile, string>({
      query: (id) => `profile/${id}`,
      async onQueryStarted(_id, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          // Update the profile slice with the fetched data
          dispatch(setProfile(data));
        } catch (error) {
          console.error("Failed to fetch profile:", error);
        }
      },
    }),
  }),
});

export const { useGetProfileQuery } = profileApi;
