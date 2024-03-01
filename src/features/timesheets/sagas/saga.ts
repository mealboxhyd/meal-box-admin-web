import { call, put, takeEvery } from "redux-saga/effects";
import { timeSheetsSlice } from "../slices/slice";
import { fetchImages } from "../services/service";
import { ResponseGenerator } from "../../../types/types";

function* actionFetchImages() {
  try {
    console.log("inside action fetch image");
    const data: ResponseGenerator = yield call(fetchImages);
    yield put(timeSheetsSlice.actions.storeSampleData(data));
    yield put(timeSheetsSlice.actions.updateLoadingState(false));
  } catch (e) {
    yield put(timeSheetsSlice.actions.updateLoadingState(false));
  }
}

function* getImagesSaga() {
  yield takeEvery(timeSheetsSlice.actions.fetchSampleData, actionFetchImages);
}

export { getImagesSaga };
