//userAction.ts
import { jwtDecode, JwtPayload } from "jwt-decode";
import { api } from "@/lib/api";

const updateUser = async () => {
  await auth(async () => {});
};

// Authentication Verification and Refresh
const auth = async (callback: () => Promise<void>) => {
  try {
    await checkAuth();
    await callback();
  } catch (err) {
    console.error("Authentication or operation failed:", err);
    api.post("/api/user/logout/", {}, {
      withCredentials: true,
    });
    throw err;
  }
};

const checkAuth = async () => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const isExpired = accessToken ? checkAccessToken(accessToken) : true;

    if (!accessToken || isExpired) {
      const response = await api.post(
        "api/token/refresh/",
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

export { auth, updateUser };
