import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface UserStateModel {
  displayName: string;
  email: string;
  photoURL: string;
  emailVerified: boolean;
  token?: string;
  uid: string;
}

const initialState: UserStateModel = {
  displayName: "",
  email: "",
  photoURL: "",
  emailVerified: false,
  token: "",
  uid: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserStateModel>) {
      return Object.assign({}, state, action.payload);
    },
    cleanUser() {
      return initialState;
    },
  },
});

export const { setUser, cleanUser } = userSlice.actions;
export default userSlice.reducer;
