import { createSlice } from "@reduxjs/toolkit";
import { Users } from "../API/Users";

export const UsersSlice = createSlice({
  name: "users",
  initialState: {},
  reducers: {
    // Define synchronous reducers here if needed
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(Users.endpoints.GetUsers.matchFulfilled, (state, action) => {
        state.categories = action.payload;
      })
      .addMatcher(
        Users.endpoints.CreateUser.matchFulfilled,
        (state, action) => {
          state.create = action.payload;
        }
      )
      .addMatcher(
        Users.endpoints.UpdateUser.matchFulfilled,
        (state, action) => {
          state.update = action.payload;
        }
      )
      .addMatcher(
        Users.endpoints.UpdateUser.matchFulfilled,
        (state, action) => {
          state.delete = action.payload;
        }
      );
  },
});

export default Users.reducer;
