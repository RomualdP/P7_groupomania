import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  post: [],
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setAllPosts: (state, action) => {
      state.post = action.payload;
    },
    addPost: (state, action) => {
      state.post.push(action.payload);
    },
  },
});

export const { setAllPosts, addPost } = postSlice.actions;

export default postSlice.reducer;
