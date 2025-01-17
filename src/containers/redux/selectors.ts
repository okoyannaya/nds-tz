import { RootState } from "./store";

export const loadingSelector = (state: RootState) => state.ndsSlice.isLoading
export const ndsSelector = (state: RootState) => state.ndsSlice.ndsList

