import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../fetchBaseQuery";

export const comments = createApi({
  baseQuery,
  reducerPath: "comments",
  endpoints: (builder) => ({
    GetComments: builder.query({
      query: () => ({
        url: "/comments",
        method: "GET",
      }),
    }),
    CreateComment: builder.mutation({
      query: (data) => ({
        url: "/comments/create",
        method: "POST",
        body: data,
      }),
    }),
    UpdateComment: builder.mutation({
      query: (data) => ({
        url: `/comments/update/${data.id}`,
        method: "PUT",
        body: { ...data, id: undefined },
      }),
    }),
    DeleteComment: builder.mutation({
      query: (data) => ({
        url: `/comments/delete/${data.id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetCommentsQuery,
  useCreateCommentMutation,
  useDeleteCommentMutation,
  useUpdateCommentMutation,
} = comments;
