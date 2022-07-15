import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {},
  reducers: {
    setUser(state, action) {
      const newState = Object.assign({}, state, action.payload.payload);
      return newState;
    },
    cleanUser(state, action) {
      return {};
    },
  },
});

export const { setUser, cleanUser } = userSlice.actions;
export default userSlice.reducer;
