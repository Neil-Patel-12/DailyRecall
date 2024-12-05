// api.ts
import axios from "axios";

export const api = axios.create({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  },
  withCredentials: true,
  baseURL: "http://127.0.0.1:8000",
});
