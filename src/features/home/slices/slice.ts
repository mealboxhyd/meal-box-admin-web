/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";

interface SnackBarProps {
  message: string;
  open: true | false;
  severity: "info" | "error" | "success" | "warning" | "default";
}

interface HomeProps {
  isLoading: boolean;
  snackBarData: SnackBarProps;
}

const initialState = {
  isLoading: false,
  snackBarData: {
    message: "",
    open: false,
    severity: "success",
  },
} as HomeProps;

const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    updateLoadingState: (state, action) => {
      state.isLoading = action.payload;
    },
    storeSnackbarData: (state, action) => {
      state.snackBarData = action.payload;
    },
    resetSnackbarData: (state) => {
      state.snackBarData = {
        message: "",
        open: false,
        severity: "success",
      };
    },
  },
});

const homeState = (state: any) => state.home;

export { homeSlice, homeState };
