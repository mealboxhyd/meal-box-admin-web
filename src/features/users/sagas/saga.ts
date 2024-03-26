import { call, put, takeEvery } from "redux-saga/effects";
import { usersSlice } from "../slices/slice";
import { fetchImages } from "../services/service";
import { ResponseGenerator } from "../../../types/types";

function* actionFetchImages() {
  try {
    console.log("inside action fetch image");
    const data: ResponseGenerator = yield call(fetchImages);
    yield put(usersSlice.actions.storeSampleData(data));
    yield put(usersSlice.actions.updateLoadingState(false));
  } catch (e) {
    yield put(usersSlice.actions.updateLoadingState(false));
  }
}

function* getImagesSaga() {
  yield takeEvery(usersSlice.actions.fetchSampleData, actionFetchImages);
}

export { getImagesSaga };
