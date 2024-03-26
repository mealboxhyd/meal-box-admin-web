import { all } from "redux-saga/effects";
import * as usersSaga from "../features/users/sagas/saga";
import * as HomeSaga from "../features/home/sagas/saga";
import * as KitchensSaga from "../features/kitchens/sagas/saga";

export function* RootSaga() {
  yield all([
    usersSaga.getImagesSaga(),

    //Kitchens
    KitchensSaga.fetchKitchensSaga(),
    KitchensSaga.fetchKitchenPlansSaga(),
    KitchensSaga.getCloudinaryImageUrl(),
  ]);
}
