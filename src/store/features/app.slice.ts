import { createSlice } from '@reduxjs/toolkit';

import type { PayloadAction } from "@reduxjs/toolkit";

export enum CLIENT_APP_MODE {
  DINE_IN = "DINE_IN",
  DELIVERY = "DELIVERY",
}

export type AppState = {
  isLoggedIn: boolean;
  mode: CLIENT_APP_MODE;
};

const initialState: AppState = {
  isLoggedIn: false,
  mode: CLIENT_APP_MODE.DINE_IN,
};

export const AppStateSlice = createSlice({
  name: "app-state",
  initialState,
  reducers: {
    setIsLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    },
  },
});

export const { setIsLoggedIn } = AppStateSlice.actions;

export default AppStateSlice.reducer;
