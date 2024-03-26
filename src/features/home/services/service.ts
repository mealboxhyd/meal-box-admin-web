import { fetchData } from "../../../apiConfig/baseService";

const fetchKitchens = () => {
  return fetchData("kitchens");
};
const fetchMeals =()=>{
  return fetchData("meals");
}

export { fetchKitchens,fetchMeals };

