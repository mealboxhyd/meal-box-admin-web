/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";

interface UsersProps {
  welcomeMessage: string;
  sampleData: any[];
  isLoading: boolean;
  name?: string ;
}

const initialState = {
  welcomeMessage: "",
  sampleData: [],
  isLoading: false,
  name : ''
} as UsersProps;

const usersSlice = createSlice({
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

const usersState = (state: any) => state.users;

export { usersState, usersSlice };
