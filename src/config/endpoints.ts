import { LoginData, RegisterData } from "@/types";
import { getToken } from "../utils";
import api from "./api";
import axios from "axios";

// Create a separate axios instance for external API calls without auth headers
const externalAxios = axios.create();
// Reset any default headers that might cause CORS issues
delete externalAxios.defaults.headers.common["Authorization"];
delete externalAxios.defaults.headers.common["X-Requested-With"];

const token = getToken();

export const ENDPOINTS = {
  auth: {
    login: (data: LoginData) => api.post("/auth/login", data),
    register: (data: RegisterData) => api.post("/auth/register", data),
    logout: () =>
      api.post("/auth/logout", {
        headers: { Authorization: `Bearer ${token}` },
      }),
    me: () => api.get("/auth/profile"),
    resetPassword: (data: { email: string }) =>
      api.post("/auth/reset-password", data),
  },
};
