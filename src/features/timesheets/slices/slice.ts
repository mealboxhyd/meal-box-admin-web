/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";

interface TimeSheetProps {
  welcomeMessage: string;
  sampleData: any[];
  isLoading: boolean;
}

const initialState = {
  welcomeMessage: "",
  sampleData: [],
  isLoading: false,
} as TimeSheetProps;

const timeSheetsSlice = createSlice({
  name: "timeSheet",
  initialState,
  reducers: {
    changeWelcomeMessage: (state) => {
      state.welcomeMessage = "Welcome to plan ship";
    },
    fetchSampleData: (state) => {
      state.isLoading = true;
    },
    storeSampleData: (state, action) => {
      state.sampleData = action.payload;
      state.isLoading = false;
    },
    updateLoadingState: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

const TimeSheetState = (state: any) => state.timeSheets;

export { TimeSheetState, timeSheetsSlice };
