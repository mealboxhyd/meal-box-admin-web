import { all } from "redux-saga/effects";
import * as KitchensSaga from "../features/kitchens/sagas/saga";

export function* RootSaga() {
  yield all([
    //Kitchens
    KitchensSaga.fetchKitchensSaga(),
    KitchensSaga.fetchKitchenPlansSaga(),
    KitchensSaga.getMealsByKitchenIdSaga(),
    KitchensSaga.createKitchenSaga(),
    KitchensSaga.deleteKitchenSaga(),
  ]);
}
