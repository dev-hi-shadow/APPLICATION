import { createSlice } from "@reduxjs/toolkit";
import { comments } from "../API/Comments";

export const commentsSlice = createSlice({
  name: "comments",
  initialState: {},
  reducers: {
    // Define synchronous reducers here if needed
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        comments.endpoints.GetComments.matchFulfilled,
        (state, action) => {
          state.categories = action.payload;
        }
      )
      .addMatcher(
        comments.endpoints.CreateComment.matchFulfilled,
        (state, action) => {
          state.create = action.payload;
        }
      )
      .addMatcher(
        comments.endpoints.UpdateComment.matchFulfilled,
        (state, action) => {
          state.update = action.payload;
        }
      )
      .addMatcher(
        comments.endpoints.DeleteComment.matchFulfilled,
        (state, action) => {
          state.delete = action.payload;
        }
      );
  },
});

export default commentsSlice.reducer;
