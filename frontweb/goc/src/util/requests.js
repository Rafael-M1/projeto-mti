import axios from "axios";
import qs from "qs";
import { getAuthData } from "./storage";

export const BASE_URL =
  import.meta.env.VITE_BACKEND_URL ?? "http://localhost:8080";

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

// Add a request interceptor
axios.interceptors.request.use(
  function (config) {
    //
    return config;
  },
  function (error) {
    //
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  function (response) {
    //
    // console.log(response);
    return response;
  },
  function (error) {
    if (error.response.status === 401) {
      // history.push('/admin/auth');
    }
    return Promise.reject(error);
  }
);
