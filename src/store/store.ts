import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import createSagaMiddleware from "redux-saga";
import logger from "redux-logger";
import { usersSlice } from "../features/users/slices/slice";
import { homeSlice } from "../features/home/slices/slice";
import { kicthensSlice } from "../features/kitchens/slices/slice";

const rootReducer = combineReducers({
  users: usersSlice.reducer,
  home: homeSlice.reducer,
  kitchens: kicthensSlice.reducer,
});

export const saga = createSagaMiddleware();
export const store = configureStore({
  reducer: rootReducer,
  middleware: [saga, logger],
});
