import axios from "axios";
import { getToken } from "./get-token";

const backend_http = axios.create({
  baseURL: "http://localhost:9000",
  timeout: 30000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});



// Change request data/error here
backend_http.interceptors.request.use(
  (config) => {
    const token = getToken();
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token ? token : ""}`,
    };
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default backend_http;
