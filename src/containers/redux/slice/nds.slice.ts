import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { NdsItem } from "../types";

type NdsState = {
  ndsList: NdsItem[];
  isLoading: boolean;
};

const initialState: NdsState = {
  ndsList: [],
  isLoading: false,
};

export const ndsSlice = createSlice({
  name: "nds",
  initialState,
  reducers: {
    setNdsList(state, action: PayloadAction<NdsItem[]>){
        state.ndsList = action.payload
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
  },
});

export const { setNdsList, setLoading } = ndsSlice.actions;
