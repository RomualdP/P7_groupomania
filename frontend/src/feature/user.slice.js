import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {},
  },
  reducers: {
    setUserData: (state, { payload }) => {
      state.user = payload;
    },
    updateUserData: (state, { payload }) => {
      state.user = payload;
    },
  },
});

export const { setUserData, updateUserData } = userSlice.actions;
export default userSlice.reducer;
