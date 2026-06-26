import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
  baseUrl: "https://ai-career-copilot-backend-a90g.onrender.com",
  }),
  endpoints: (builder) => ({
    getMyResumes: builder.query({
      query: () => ({
        url: "/my-resumes",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
    }),
  }),
});

export const {
  useGetMyResumesQuery,
} = apiSlice;