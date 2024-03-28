import {
  deleteData,
  fetchData,
  postData,
  updateData,
} from "../../../apiConfig/baseService";
import * as KITCHEN_CONSTANTS from "../constants/constants";

export class KitchensService {
  static fetchKicthens = () => {
    return fetchData(KITCHEN_CONSTANTS.PARAM_URL.KICTHENS);
  };

  static fetchKitchensById = (id: string) => {
    return fetchData(KITCHEN_CONSTANTS.PARAM_URL.KITCHENS_BY_ID, [id]);
  };

  static updateKicthen = (req: any) => {
    return updateData(KITCHEN_CONSTANTS.PARAM_URL.KITCHENS_BY_ID, req, [
      req?._id,
    ]);
  };

  static deleteKitchen = (id: string) => {
    return deleteData(KITCHEN_CONSTANTS.PARAM_URL.KITCHENS_BY_ID, [id]);
  };

  static createKitchen = (req: any) => {
    return postData(KITCHEN_CONSTANTS.PARAM_URL.KICTHENS, req);
  };

  static fetchPlans = () => {
    return fetchData(KITCHEN_CONSTANTS.PARAM_URL.PLANS);
  };

  static fetchMealsByKitchenId = (kitchenId: string) => {
    return fetchData(KITCHEN_CONSTANTS.PARAM_URL.MEALS, [kitchenId]);
  };
}
