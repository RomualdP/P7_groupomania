import { createSlice } from "@reduxjs/toolkit";

const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
  },
  reducers: {
    setAllUsersData: (state, action) => {
      state.users = action.payload;
    },
  },
});
export const { setAllUsersData } = usersSlice.actions;

export default usersSlice.reducer;
