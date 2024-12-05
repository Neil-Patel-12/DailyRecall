//userAction.ts
import { useAuth } from "@/contexts/AuthContext";
import axios from "axios";
import { jwtDecode, JwtPayload } from "jwt-decode";

export const updateUser = async () => {};


// Authentication Verification and Refresh
const checkAuth = async () => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const isExpired = accessToken ? checkAccessToken(accessToken) : true;

    if (!accessToken || isExpired) {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/token/refresh/",
        {},
        {
          withCredentials: true,
        }
      );

      const newAccessToken = response.data.accessToken;
      localStorage.setItem("accessToken", newAccessToken);
    }
  } catch (err) {
    console.error("Token refresh failed:", err);
    localStorage.removeItem("accessToken");
    window.location.href = "/user/login/";
    throw new Error("User is not authenticated");
  }
};


// Helper Function (check if access token expired)
const checkAccessToken = (token: string): boolean => {
  try {
    const decoded = jwtDecode<JwtPayload>(token);
    if (!decoded.exp) {
      return true;
    }
    return decoded.exp * 1000 < Date.now();
  } catch (error) {
    console.error("Error decoding token:", error);
    return true;
  }
};
