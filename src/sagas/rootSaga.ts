import { all } from "redux-saga/effects";
import * as TimeSheetsSaga from "../features/timesheets/sagas/saga";

export function* RootSaga() {
  yield all([TimeSheetsSaga.getImagesSaga()]);
}
