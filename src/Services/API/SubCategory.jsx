import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../fetchBaseQuery";

export const SubCategories = createApi({
  baseQuery,
  reducerPath: "subcategories",
  endpoints: (builder) => ({
    GetSubCategories: builder.query({
      query: () => ({
        url: "/sub-categories",
        method: "GET",
      }),
    }),
 
    CreateSubCategories: builder.mutation({
      query: (data) => ({
        url: "/sub-categories/create",
        method: "POST",
        body: data,
      }),
    }),
    UpdateSubCategories: builder.mutation({
      query: (data) => ({
        url: `/sub-categories/update/${data.id}`,
        method: "PUT",
        body: { ...data, id: undefined },
      }),
    }),
    DeleteSubCategories: builder.mutation({
      query: (data) => ({
        url: `/sub-categories/delete/${data.id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetSubCategoriesQuery,
  useCreateSubCategoriesMutation,
  useDeleteSubCategoriesMutation,
  useUpdateSubCategoriesMutation,
} = SubCategories;
