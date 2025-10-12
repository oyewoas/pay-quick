import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
interface ProfileState {
  name: string;
  email: string;
};

const initialState: ProfileState = {
  name: "",
  email: "",
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfile(state, action: PayloadAction<ProfileState>) {
      state.name = action.payload.name;
      state.email = action.payload.email;
    },
    clearProfile(state) {
      state.name = "";
      state.email = "";
    },
  },
});

export const { setProfile, clearProfile } = profileSlice.actions;
export const selectProfile = (state: RootState) => state.profile;
export default profileSlice.reducer;
