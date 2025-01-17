import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { NdsItem } from "../types";

export const ndsApi = createApi({
  reducerPath: "ndsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://195.133.39.82:8080",
    prepareHeaders: (headers) => {
      headers.set(
        "Authorization",
        `Bearer ${localStorage.getItem("access_token") ?? ""}`
      );

      return headers;
    },
  }),
  tagTypes: ["Nds"],
  endpoints: (build) => ({
    getAllNds: build.query<NdsItem[], void>({
      query: () => ({
        method: "GET",
        url: "api/Nds",
      }),
      providesTags: ["Nds"],
    }),
    getNds: build.query<NdsItem, string>({
      query: (id) => ({
        method: "GET",
        url: `api/Nds/${id}`,
      }),
      providesTags: ["Nds"],
    }),
    addNds: build.mutation<NdsItem, Partial<NdsItem>>({
      query: (body) => ({
        url: "api/Nds",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Nds"],
    }),
    changeNds: build.mutation<NdsItem, Partial<NdsItem>>({
      query: (body) => ({
        url: `api/Nds/${body.id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Nds"],
    }),
    deleteNds: build.mutation<NdsItem, string>({
      query: (id) => ({
        url: `api/Nds/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Nds"],
    }),
  }),
});

export const {
  useGetAllNdsQuery,
  useGetNdsQuery,
  useAddNdsMutation,
  useChangeNdsMutation,
  useDeleteNdsMutation,
} = ndsApi;
