import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import createSagaMiddleware from "redux-saga";
import logger from "redux-logger";
import { timeSheetsSlice } from "../features/timesheets/slices/slice";

const rootReducer = combineReducers({
  timeSheets: timeSheetsSlice.reducer,
});

export const saga = createSagaMiddleware();
export const store = configureStore({
  reducer: rootReducer,
  middleware: [saga, logger],
});
