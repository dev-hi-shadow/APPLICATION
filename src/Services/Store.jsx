import { combineReducers, configureStore } from "@reduxjs/toolkit";

// API's
import { auth } from "./API/auth";
import { category } from "./API/Category";
import { SubCategories } from "./API/SubCategory";
import { Blogs } from "./API/Blogs";
import { Users } from "./API/Users";
import { comments } from "./API/Comments";
// SLICES
import authSlice from "./Slices/auth";
import categorySlice from "./Slices/Category";
import subCategorySlice from "./Slices/SubCategory";
import BlogsSlice from "./Slices/Blogs";
import UsersSlice from "./Slices/Users";
import commentsSlice from "./Slices/Comments";

const rootReducer = combineReducers({
  [auth.reducerPath]: auth.reducer,
  [category.reducerPath]: category.reducer,
  [SubCategories.reducerPath]: SubCategories.reducer,
  [Blogs.reducerPath]: Blogs.reducer,
  [Users.reducerPath]: Users.reducer,
  [comments.reducerPath]: comments.reducer,
  authSlice,
  categorySlice,
  subCategorySlice,
  BlogsSlice,
  UsersSlice,
  commentsSlice,
});

export const Store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      auth.middleware,
      Blogs.middleware,
      category.middleware,
      SubCategories.middleware,
      Users.middleware,
      comments.middleware
    ),
});
