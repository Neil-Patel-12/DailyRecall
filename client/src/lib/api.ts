// api.ts
import axios from "axios";

export const api = axios.create({
  withCredentials: true,
  baseURL: "http://127.0.0.1:8000",
});
