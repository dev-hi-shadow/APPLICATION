import { createSlice } from "@reduxjs/toolkit";
import { SubCategories } from "../API/SubCategory";

export const SubCategoriesSlice = createSlice({
  name: "SubCategories",
  initialState: {},
  reducers: {
    // Define synchronous reducers here if needed
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        SubCategories.endpoints.GetSubCategories.matchFulfilled,
        (state, action) => {
          state.SubCategories = action.payload;
        }
      )
      .addMatcher(
        SubCategories.endpoints.CreateSubCategories.matchFulfilled,
        (state, action) => {
          state.create = action.payload;
        }
      )
      .addMatcher(
        SubCategories.endpoints.UpdateSubCategories.matchFulfilled,
        (state, action) => {
          state.update = action.payload;
        }
      )
      .addMatcher(
        SubCategories.endpoints.DeleteSubCategories.matchFulfilled,
        (state, action) => {
          state.delete = action.payload;
        }
      );
  },
});

export default SubCategoriesSlice.reducer;
