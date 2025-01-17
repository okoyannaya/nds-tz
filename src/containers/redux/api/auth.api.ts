import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { BASE_URL } from "../constants";


export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (build) => ({
    getToken: build.query<string, void>({
      query: () => ({ method: 'GET', url: 'token' }),
    }),
  }),
});

export const { useLazyGetTokenQuery } = authApi;
