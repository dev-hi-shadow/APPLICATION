import { createSlice } from "@reduxjs/toolkit";
import { Blogs } from "../API/Blogs";

export const BlogsSlice = createSlice({
  name: "blogs",
  initialState: {},
  reducers: {
    // Define synchronous reducers here if needed
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(Blogs.endpoints.GetBlogs.matchFulfilled, (state, action) => {
        state.blogs = action.payload;
      })
      .addMatcher(
        Blogs.endpoints.CreateBlogs.matchFulfilled,
        (state, action) => {
          state.create = action.payload;
        }
      )
      .addMatcher(
        Blogs.endpoints.UpdateBlogs.matchFulfilled,
        (state, action) => {
          state.update = action.payload;
        }
      )
      .addMatcher(
        Blogs.endpoints.DeleteBlogs.matchFulfilled,
        (state, action) => {
          state.delete = action.payload;
        }
      );
  },
});

export default BlogsSlice.reducer;
