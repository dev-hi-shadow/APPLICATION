import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../fetchBaseQuery";

export const Users = createApi({
  baseQuery,
  reducerPath: "subcategory",
  endpoints: (builder) => ({
    GetUsers: builder.query({
      query: ({ type }) => {
        return {
          url: `/users?${type && `type=${type}`}`,
          method: "GET",
        };
      },
    }),
    CreateUser: builder.mutation({
      query: (data) => ({
        url: "/sub-categories/create",
        method: "POST",
        body: data,
      }),
    }),
    UpdateUser: builder.mutation({
      query: (data) => ({
        url: `/sub-categories/update/${data.id}`,
        method: "PUT",
        body: { ...data, id: undefined },
      }),
    }),
    DeleteUser: builder.mutation({
      query: (data) => ({
        url: `/sub-categories/delete/${data.id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useGetUsersQuery,
} = Users;
