import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.155.54:4000/graphql",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  async (config) => {
    const token = "AuthToken";
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      console.log("Unauthorized access - redirecting to login");
    }
    return Promise.reject(error);
  }
);

export default api;
