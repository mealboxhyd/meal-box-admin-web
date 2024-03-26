// import { call, takeEvery ,put} from "redux-saga/effects";
// import { homeSlice } from "../slices/slice";
// import { fetchKitchens, fetchMeals } from "../services/service";
// import { ResponseGenerator } from "../../../types/types";

// function* actionGetKitchens(){
//     try {
//         const kitchens : ResponseGenerator= yield call(fetchKitchens);
//         yield put(homeSlice.actions.storeKitchens(kitchens))
//         console.log(kitchens)
//     } catch (error) {
//         console.log(error);
//         yield put(homeSlice.actions.updateLoadingState(false))
//     }
// }
// function* actionGetMeals(){
//     try {
//         const meals : ResponseGenerator= yield call(fetchMeals);
//         yield put(homeSlice.actions.storeMeals(meals))
//     } catch (error) {
//         yield put(homeSlice.actions.updateLoadingState(false))
//     }
// }

// function* getKitchenSaga(){
//     yield takeEvery(homeSlice.actions.getKicthens,actionGetKitchens)
// }
//  function* getMealSaga(){
//     yield takeEvery(homeSlice.actions.getMeals,actionGetMeals)
//  }

// export {getKitchenSaga,getMealSaga}
