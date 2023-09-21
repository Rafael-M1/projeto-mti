import axios from "axios";
import qs from "qs";
import { getAuthData } from "./storage";
import { isUserAuthenticated } from "./auth";

export const BASE_URL =
  import.meta.env.VITE_BACKEND_URL ?? "http://localhost:8081/apigoc";

const CLIENT_ID = import.meta.env.VITE_CLIENT_ID ?? "myclientid";
const CLIENT_SECRET = import.meta.env.VITE_CLIENT_SECRET ?? "myclientsecret";

export const requestBackendLogin = (loginData) => {
  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
    Authorization: "Basic " + window.btoa(CLIENT_ID + ":" + CLIENT_SECRET),
  };

  const data = qs.stringify({
    ...loginData,
    grant_type: "password",
  });
  return axios({
    method: "POST",
    baseURL: BASE_URL,
    url: "/oauth/token",
    data,
    headers,
  });
};

export const requestBackend = (config) => {
  const headers = config.withCredentials
    ? {
        ...config.headers,
        Authorization: "Bearer " + getAuthData().access_token,
      }
    : config.headers;

  return axios({ ...config, baseURL: BASE_URL, headers });
};

const AxiosInterceptorsSetup = (navigate) => {
  axios.interceptors.request.use(
    (response) => {
      if (
        response &&
        response.headers &&
        response.headers.Authorization &&
        response.headers.Authorization.includes("Bearer ")
      ) {
        if (!isUserAuthenticated()) {
          response.headers.Authorization = "";
          navigate("/goc/admin/auth");
        }
      }
      return response;
    },
    (error) => {
      if (error.response.status === 401) {
        navigate("/goc/admin/auth");
      }
      return Promise.reject(error);
    }
  );
};

export default AxiosInterceptorsSetup;

// Add a response interceptor
axios.interceptors.response.use(
  function (response) {
    //
    // console.log(response);
    return response;
  },
  function (error) {
    if (
      error &&
      error.response &&
      error.response.status &&
      error.response.status === 401
    ) {
      // history.push('/admin/auth');
    }
    return Promise.reject(error);
  }
);
