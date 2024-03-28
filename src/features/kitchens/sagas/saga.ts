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

function* getMealsByKitchenIdAction(): any {
  try {
    // const {} =
    const results = yield call(
      KitchensService.fetchMealsByKitchenId,
      "65c9ee1a69a51c6295ebdf28"
    );
    yield put(kicthensSlice.actions.getMealsByKitchenIdSuccess(results));
  } catch (e) {
    console.log(e, "[error]");
    yield put(kicthensSlice.actions.getMealsByKitchenIdFailure());
    yield put(
      homeSlice.actions.storeSnackbarData({
        message: "Failed to fetch kitchen meals",
        open: true,
        severity: "error",
      })
    );
  }
}

function* createKitchenAction(): any {
  const { kitchenRequest } = yield select(kitchensState);
  try {
    yield call(KitchensService.createKitchen, kitchenRequest);
    yield put(kicthensSlice.actions.createKitchenSuccess());
    yield put(
      homeSlice.actions.storeSnackbarData({
        message: `${kitchenRequest.name} is created successfully`,
        open: true,
        severity: "success",
      })
    );
    yield put(kicthensSlice.actions.fetchKitchens());
  } catch (e) {
    yield put(kicthensSlice.actions.createKitchenFailure());
    yield put(
      homeSlice.actions.storeSnackbarData({
        message: `Failed to create kitchen ${kitchenRequest.name}`,
        open: true,
        severity: "error",
      })
    );
  }
}

function* editKitchenAction(): any {
  const { kitchenRequest } = yield select(kitchensState);
  try {
    yield call(KitchensService.updateKicthen, kitchenRequest);
    yield put(kicthensSlice.actions.createKitchenSuccess());
    yield put(
      homeSlice.actions.storeSnackbarData({
        message: `${kitchenRequest.name} is updated successfully`,
        open: true,
        severity: "success",
      })
    );
    yield put(kicthensSlice.actions.fetchKitchens());
  } catch (e) {
    yield put(kicthensSlice.actions.createKitchenFailure());
    yield put(
      homeSlice.actions.storeSnackbarData({
        message: `Failed to update kitchen ${kitchenRequest.name}`,
        open: true,
        severity: "error",
      })
    );
  }
}

function* deleteKitchenAction(): any {
  const { deleteKitchenId } = yield select(kitchensState);
  try {
    yield call(KitchensService.deleteKitchen, deleteKitchenId);
    yield put(kicthensSlice.actions.deleteKitchenSuccess());
    yield put(
      homeSlice.actions.storeSnackbarData({
        message: `Kitchen is deleted successfully`,
        open: true,
        severity: "success",
      })
    );
    yield put(kicthensSlice.actions.fetchKitchens());
  } catch (e) {
    yield put(kicthensSlice.actions.createKitchenFailure());
    yield put(
      homeSlice.actions.storeSnackbarData({
        message: `Failed to create kitchen`,
        open: true,
        severity: "error",
      })
    );
  }
}

function* getKitchenByIdActon(): any {
  const { selectedKitchen } = yield select(kitchensState);
  try {
    const results = yield call(
      KitchensService.fetchKitchensById,
      selectedKitchen?._id
    );
    yield put(kicthensSlice.actions.getKitchenByIdSuccess(results));
    yield put(
      homeSlice.actions.storeSnackbarData({
        message: `${selectedKitchen?.name} info retrieved successfully`,
        open: true,
        severity: "success",
      })
    );
  } catch (e) {
    yield put(kicthensSlice.actions.getKitchenByIdFailure());
    yield put(
      homeSlice.actions.storeSnackbarData({
        message: `Failed to fetch ${selectedKitchen?.name} info`,
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

function* getMealsByKitchenIdSaga() {
  yield takeEvery(
    kicthensSlice.actions.getMealsByKitchenId,
    getMealsByKitchenIdAction
  );
}

function* createKitchenSaga() {
  yield takeEvery(kicthensSlice.actions.createKitchen, createKitchenAction);
}

function* deleteKitchenSaga() {
  yield takeEvery(kicthensSlice.actions.deleteKitchen, deleteKitchenAction);
}

function* editKitchenSaga() {
  yield takeEvery(kicthensSlice.actions.editKitchen, editKitchenAction);
}

function* getKitchenByIdSaga() {
  yield takeEvery(
    kicthensSlice.actions.getKitchenInfoById,
    getKitchenByIdActon
  );
}

export {
  fetchKitchensSaga,
  fetchKitchenPlansSaga,
  getMealsByKitchenIdSaga,
  createKitchenSaga,
  deleteKitchenSaga,
  getKitchenByIdSaga,
  editKitchenSaga,
};
