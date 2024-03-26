import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  kitchens: [],
  plans: [],
  kitchenImages: [],
  kitchenImageUrls: [],
};

const kicthensSlice = createSlice({
  name: "kitchens",
  initialState,
  reducers: {
    updateLoadingState: (state, action) => {
      state.isLoading = action.payload;
    },
    fetchKitchens: (state) => {
      state.isLoading = true;
    },
    fetchKitchensSuccess: (state, action) => {
      state.kitchens = action.payload;
      state.isLoading = false;
    },
    fetchKitchensFailure: (state) => {
      state.isLoading = false;
    },
    fetchKitchenPlans: (state) => {
      state.isLoading = true;
    },
    fetchKitchenPlansSuccess: (state, action) => {
      state.plans = action.payload;
      state.isLoading = false;
    },
    fetchKitchenPlansFailure: (state) => {
      state.isLoading = false;
    },
    storeKitchenImages: (state, action) => {
      state.isLoading = true;
      state.kitchenImages = action.payload;
    },
    storeKitchenImagesSuccess: (state, action) => {
      state.kitchenImageUrls = action.payload;
      state.isLoading = false;
    },
    storeKitchenImagesFailure: (state) => {
      state.isLoading = false;
    },
  },
});

const kitchensState = (state: any) => state.kitchens;

export { kitchensState, kicthensSlice };
