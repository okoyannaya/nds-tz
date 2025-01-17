import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://195.133.39.82:8080" }),
  endpoints: (build) => ({
    getToken: build.query<string, void>({
      query: () => ({ method: 'GET', url: 'token' }),
    }),
  }),
});

export const { useLazyGetTokenQuery } = authApi;
