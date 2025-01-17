import { configureStore } from "@reduxjs/toolkit";

import { authApi } from "./api/auth.api";
import { ndsApi } from "./api/nds.api";
import { ndsSlice } from "./slice/nds.slice";

export const store = configureStore({
  reducer: {
    ndsSlice: ndsSlice.reducer,
    [ndsApi.reducerPath]: ndsApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
  .concat(ndsApi.middleware)
  .concat(authApi.middleware),
});
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
