import axios from "axios";

export const defaultHeaders = {
  Accept: "application/json",
  "X-Requested-With": "XMLHttpRequest",
};

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  // withCredentials: true,
  headers: defaultHeaders,
});

export default api;
