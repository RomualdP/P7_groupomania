import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {},
  reducers: {
    setUserData: (state, { payload }) => {
      state = payload;
    },
  },
});

export const { setUserData } = userSlice.actions;
export default userSlice.reducer;
