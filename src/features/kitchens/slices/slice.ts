import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  kitchens: [],
  plans: [],
  kitchenImages: [],
  kitchenImageUrls: [],
  kitchenMeals: [],
  kitchenRequest: {},
  kitchenModal: false,
  deleteKitchenId: "",
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
    getMealsByKitchenId: (state) => {
      state.isLoading = true;
    },
    getMealsByKitchenIdSuccess: (state, action) => {
      state.kitchenMeals = action.payload;
      state.isLoading = false;
    },
    getMealsByKitchenIdFailure: (state) => {
      state.isLoading = false;
    },
    createKitchen: (state, action) => {
      const request = action.payload;
      request.searchTags = request?.searchTags?.split(",");
      request.badges = request?.badges?.split(",");
      request.contact = request?.contact?.split(",");
      request.availablePlans = request?.availablePlans?.map(
        (plan: any) => plan._id
      );
      request.type = request?.type?.map((t: any) => t.value);
      request.paymentsAccepted = request?.paymentsAccepted?.map(
        (payment: any) => payment.value
      );
      request.status = "ACT";
      state.kitchenRequest = request;
    },
    createKitchenSuccess: (state) => {
      state.kitchenRequest = {};
      state.kitchenImages = [];
      state.kitchenImageUrls = [];
      state.kitchenMeals = [];
      state.kitchenModal = false;
    },
    createKitchenFailure: (state) => {
      state.isLoading = false;
    },
    handleKitchenModal: (state, action) => {
      state.kitchenModal = action.payload;
    },
    deleteKitchen: (state, action) => {
      state.isLoading = true;
      state.deleteKitchenId = action.payload;
    },
    deleteKitchenSuccess: (state) => {
      state.deleteKitchenId = "";
      state.isLoading = false;
    },
    deleteKitchenFailure: (state) => {
      state.deleteKitchenId = "";
      state.isLoading = false;
    },
  },
});

const kitchensState = (state: any) => state.kitchens;

export { kitchensState, kicthensSlice };
