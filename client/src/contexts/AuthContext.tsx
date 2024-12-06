// AuthContext.tsx

import { loginSchema } from "@/components/auth/loginForm";
import { signupSchema } from "@/components/auth/signupForm";
import axios from "axios";
import { createContext, ReactNode, useContext, useState } from "react";
import { z } from "zod";
import { jwtDecode, JwtPayload } from "jwt-decode";

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

export type AuthContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  signup: (user: z.infer<typeof signupSchema>) => Promise<User | null>;
  login: (user: z.infer<typeof loginSchema>) => Promise<User | null>;
  logout: () => void;
};

interface CustomJwtPayload extends JwtPayload {
  UserInfo: User;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // EXPORTED FUNCTION (REGISTER)
  const signup = async (user: z.infer<typeof signupSchema>) => {
    try {
      const response = await axios.post("/api/user/register/", user, {
        withCredentials: true,
      });
      const token = response.data.accessToken;
      const decoded = jwtDecode<CustomJwtPayload>(token);
      const userData: User = decoded.UserInfo;

      setUser(userData);

      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("accessToken", token);
      return response.data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.error(err.response?.data);
        throw err;
      } else {
        console.error("Unexpected error:", err);
        throw err;
      }
    }
  };

  // EXPORTED FUNCTION (LOGIN)
  const login = async (user: z.infer<typeof loginSchema>) => {
    try {
      const response = await axios.post("/api/user/login/", user, {
        withCredentials: true,
      });
      console.log(response);
      const token = response.data.accessToken;
      const userData: User = response.data.userInfo;

      setUser(userData);

      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("accessToken", token);
      return response.data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.error(err.response?.data);
        throw err;
      } else {
        console.error("Unexpected error:", err);
        throw err;
      }
    }
  };

  // EXPORTED FUNCTION (LOGOUT)
  const logout = async () => {
    try {
      await axios.post("/api/user/logout/", user, {
        withCredentials: true,
      });
      setUser(null);
      localStorage.removeItem("user");
      localStorage.removeItem("accessToken");
      window.location.href = "/";
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.error(err.response?.data);
        throw err;
      } else {
        console.error("Unexpected error:", err);
        throw err;
      }
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default useAuth;
