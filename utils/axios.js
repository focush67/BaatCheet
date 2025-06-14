import axios from "axios";
import Constants from "expo-constants";
const api = axios.create({
  baseURL: __DEV__
    ? "http://192.168.168.54:4000/graphql"
    : process.env.EXPO_PUBLIC_PRODUCTION_SERVER ||
      Constants?.expoConfig?.extra?.PRODUCTION_SERVER,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  async (config) => {
    const token = "DEVAUTHTOKEN";
    // console.log(`[API] Request to ${config.url}`, {
    //   method: config.method,
    //   data: config.data,
    //   headers: config.headers,
    // });

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error("[API] Request error:", {
      url: error.config?.url,
      method: error.config?.method,
      error: error.message,
      stack: error.stack,
    });
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    // console.log(`[API] Response from ${response.config.url}`, {
    //   status: response.status,
    //   data: response.data,
    // });
    return response;
  },
  (error) => {
    const errorDetails = {
      config: {
        url: error.config?.url,
        method: error.config?.method,
        data: error.config?.data,
      },
      response: {
        status: error.response?.status,
        data: error.response?.data,
        headers: error.response?.headers,
      },
      message: error.message,
      stack: error.stack,
    };

    console.error("[API] Response error:", errorDetails);

    if (error?.response?.status === 401) {
      console.warn("[AUTH] Unauthorized - redirecting to login");
      throw new Error(
        "Unauthorized access inside interceptors - please log in again."
      );
    }

    return Promise.reject({
      ...error,
      errorDetails,
    });
  }
);

export default api;
