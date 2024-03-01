import { fetchData } from "../../../apiConfig/baseService";

const fetchImages = () => {
  console.log("inside service");
  return fetchData("/images");
};

export { fetchImages };
