/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

const userInfoJsonObject = localStorage.getItem("userInfo")
  ? localStorage.getItem("userInfo")
  : "";

const userInfoParsedObject = userInfoJsonObject
  ? JSON.parse(userInfoJsonObject)
  : null;

const accessToken = userInfoParsedObject?.jwtToken?.accessToken;

const config = {
  headers: {
    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWNhMDcwYTA5MTFkZTA5OTQwYTNmODgiLCJ1c2VyVHlwZSI6InVzZXIiLCJpYXQiOjE3MTEzNzcwMDEsImV4cCI6MTcxMTk4MTgwMX0.s3oWWxhdxOyF-VzFfSEHMCtvQE6-yOstmqgugsHMXbc`,
  },
};

const getImageUrlFromCloudinary = (data: any) => {
  return fetch("https://api.cloudinary.com/v1_1/da8jktqmk/image/upload", {
    method: "post",
    body: data,
  }).then((res) => res.json());
};

const setParams = (endPoint: string, params: string[]) => {
  let pEndPoint = endPoint;

  if (endPoint) {
    params?.forEach((param, i) => {
      pEndPoint = pEndPoint.replace(`@${i}`, param);
    });
  }
  return pEndPoint;
};

const fetchData = async (endpoint: string, params?: any) => {
  const baseURL = import.meta.env.VITE_BASE_API_URL;
  let apiUrl = baseURL;
  if (endpoint) {
    apiUrl = baseURL + endpoint;
  }
  if (params?.length > 0) {
    apiUrl = setParams(apiUrl, params);
  }
  const response = await axios.get(apiUrl, config);
  return response.data;
};

const postData = async (endpoint: string, request: any, params?: any) => {
  const baseURL = import.meta.env.VITE_BASE_API_URL;
  let apiUrl = baseURL;
  if (endpoint) {
    apiUrl = baseURL + endpoint;
  }
  if (params?.length > 0) {
    apiUrl = setParams(apiUrl, params);
  }
  const response = await axios.post(apiUrl, request, config);
  return response.data;
};

const updateData = async (endpoint: string, request: any, params?: any) => {
  const baseURL = import.meta.env.VITE_BASE_API_URL;
  let apiUrl = baseURL;
  if (endpoint) {
    apiUrl = baseURL + endpoint;
  }
  if (params?.length > 0) {
    apiUrl = setParams(apiUrl, params);
  }
  const response = await axios.put(apiUrl, request, config);
  return response.data;
};

const deleteData = async (endpoint: string, params?: any) => {
  console.log(endpoint, "[endpoint]");
  console.log(params, "[params]");
  const baseURL = import.meta.env.VITE_BASE_API_URL;
  let apiUrl = baseURL;
  if (endpoint) {
    apiUrl = baseURL + endpoint;
  }
  if (params?.length > 0) {
    apiUrl = setParams(apiUrl, params);
  }
  const response = await axios.delete(apiUrl, config);
  return response.data;
};

export {
  fetchData,
  postData,
  updateData,
  deleteData,
  getImageUrlFromCloudinary,
};
