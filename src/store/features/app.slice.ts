import { createSlice } from '@reduxjs/toolkit';

import type { PayloadAction } from "@reduxjs/toolkit";

export type AppState = {
  isLoggedIn: boolean;
};

const initialState: AppState = {
  isLoggedIn: false,
};

export const appStateSlice = createSlice({
  name: "app-state",
  initialState,
  reducers: {
    setIsLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    },
  },
});

export const { setIsLoggedIn } = appStateSlice.actions;

export default appStateSlice.reducer;
