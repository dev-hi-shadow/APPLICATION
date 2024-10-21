import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../fetchBaseQuery";

export const Blogs = createApi({
  baseQuery,
  reducerPath: "blogs",
  endpoints: (builder) => ({
    GetBlogs: builder.query({
      query: ({ offset, limit }) => ({
        url: `/blogs?limit=${limit}&offset=${offset}`,
        method: "GET",
      }),
    }),
    GetBlog: builder.query({
      query: ({ id }) => ({
        url: `/blogs/${id}`,
        method: "GET",
      }),
      transformResponse: (res) => res.data,
    }),
    CreateBlogs: builder.mutation({
      query: (data) => ({
        url: "/blogs/create",
        method: "POST",
        body: data,
      }),
    }),
    UpdateBlogs: builder.mutation({
      query: (data) => ({
        url: `/blogs/update/${data.id}`,
        method: "PUT",
        body: { ...data, id: undefined },
      }),
    }),
    DeleteBlogs: builder.mutation({
      query: (data) => ({
        url: `/blogs/delete/${data.id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetBlogsQuery,
  useCreateBlogsMutation,
  useDeleteBlogsMutation,
  useUpdateBlogsMutation,
  useGetBlogQuery,
} = Blogs;
