import { createSlice } from "@reduxjs/toolkit";
import { KITCHEN_LOOKUPS } from "../constants/constants";

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
  kitchenInfo: {},
  selectedKitchen: {},
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
      state.plans = action.payload.map((plan: any) => {
        delete plan.createdAt;
        delete plan.updatedAt;
        delete plan.status;
        delete plan.__v;
        return {
          ...plan,
        };
      });
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
    getKitchenInfoById: (state, action) => {
      state.isLoading = true;
      state.kitchenModal = true;
      state.selectedKitchen = action.payload;
    },
    getKitchenByIdSuccess: (state, action) => {
      const data = action.payload;
      data.searchTags = data?.searchTags?.join(",");
      data.badges = data?.badges?.join(",");
      data.contact = data?.contact?.join(",");
      // const selectedPlans: any = [];
      // state.plans.forEach((ap: any) => {
      //   data.availablePlans.forEach((p: any) => {
      //     if (p._id === ap._id) {
      //       selectedPlans.push(ap);
      //     }
      //   });
      // });
      // data.availablePlans = selectedPlans;

      const kitchenTypes: any = [];
      KITCHEN_LOOKUPS.KITCHEN_TYPES.forEach((type: any) => {
        data.type.forEach((t: any) => {
          if (t === type.value) {
            kitchenTypes.push(type);
          }
        });
      });

      const paymentOptions: any = [];
      KITCHEN_LOOKUPS.PAYMENTS_TYPES.forEach((type: any) => {
        data.paymentsAccepted.forEach((t: any) => {
          if (t === type.value) {
            paymentOptions.push(type);
          }
        });
      });
      data.type = kitchenTypes;
      data.paymentsAccepted = paymentOptions;
      state.kitchenImageUrls = data?.images;
      state.kitchenInfo = data;
      state.selectedKitchen = {};
      state.isLoading = false;
    },
    getKitchenByIdFailure: (state) => {
      state.isLoading = false;
      state.selectedKitchen = {};
    },
    editKitchen: (state, action) => {
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
    editKitchenSuccess: (state) => {
      state.kitchenRequest = {};
      state.kitchenImages = [];
      state.kitchenImageUrls = [];
      state.kitchenMeals = [];
      state.kitchenModal = false;
    },
    editKitchenFailure: (state) => {
      state.isLoading = false;
    },
  },
});

const kitchensState = (state: any) => state.kitchens;

export { kitchensState, kicthensSlice };
