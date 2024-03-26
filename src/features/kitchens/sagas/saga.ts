import { call, select, put, takeEvery, all } from "redux-saga/effects";
import { kicthensSlice, kitchensState } from "../slices/slice";
import { KitchensService } from "../services/service";
import { homeSlice } from "../../home/slices/slice";
import { getImageUrlFromCloudinary } from "../../../apiConfig/baseService";

function* fetchKitchensAction(): any {
  try {
    const results = yield call(KitchensService.fetchKicthens);
    yield put(kicthensSlice.actions.fetchKitchensSuccess(results));
  } catch {
    yield put(kicthensSlice.actions.fetchKitchensFailure());
    yield put(
      homeSlice.actions.storeSnackbarData({
        message: "Failed to fetch kitchens",
        open: true,
        severity: "error",
      })
    );
  }
}

function* fetchKitchenPlansAction(): any {
  try {
    const results = yield call(KitchensService.fetchPlans);
    yield put(kicthensSlice.actions.fetchKitchenPlansSuccess(results));
  } catch {
    yield put(kicthensSlice.actions.fetchKitchenPlansFailure());
    yield put(
      homeSlice.actions.storeSnackbarData({
        message: "Failed to fetch kitchen plans",
        open: true,
        severity: "error",
      })
    );
  }
}

function* actionFetchImageUrl(): any {
  try {
    const { kitchenImages } = yield select(kitchensState);
    const fileStore: any = [];
    // eslint-disable-next-line prefer-spread
    fileStore.push.apply(fileStore, kitchenImages);

    const results = yield all(
      fileStore.map((file: any) => {
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "da8jktqmk");
        data.append("cloud_name", "da8jktqmk");
        return call(getImageUrlFromCloudinary, data);
      })
    );
    yield put(
      kicthensSlice.actions.storeKitchenImagesSuccess(
        results.map((image: any) => image.url)
      )
    );
  } catch (e) {
    yield put(kicthensSlice.actions.storeKitchenImagesFailure());
    yield put(
      homeSlice.actions.storeSnackbarData({
        message: "Failed to uplaod images",
        open: true,
        severity: "error",
      })
    );
  }
}

function* fetchKitchensSaga() {
  yield takeEvery(kicthensSlice.actions.fetchKitchens, fetchKitchensAction);
}

function* fetchKitchenPlansSaga() {
  yield takeEvery(
    kicthensSlice.actions.fetchKitchenPlans,
    fetchKitchenPlansAction
  );
}

function* getCloudinaryImageUrl() {
  yield takeEvery(
    kicthensSlice.actions.storeKitchenImages,
    actionFetchImageUrl
  );
}

export { fetchKitchensSaga, fetchKitchenPlansSaga, getCloudinaryImageUrl };
