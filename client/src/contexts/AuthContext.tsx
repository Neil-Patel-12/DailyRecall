// AuthContext.tsx

import { loginSchema } from "@/components/auth/loginForm";
import { signupSchema } from "@/components/auth/signupForm";
import axios from "axios";
import { createContext, ReactNode, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { jwtDecode } from "jwt-decode";

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
}

export type AuthContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  signup: (user: z.infer<typeof signupSchema>) => Promise<User | null>;
  login: (user: z.infer<typeof loginSchema>) => Promise<User | null>;
  logout: () => void;
};

type CustomJwtPayload = {
  UserInfo: User;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const logout = async () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    navigate("/home");
  };

  const signup = async (user: z.infer<typeof signupSchema>) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/user/register/",
        user,
        {
          withCredentials: true,
        }
      );
      const token = response.data.accessToken;
      const decoded = jwtDecode<CustomJwtPayload>(token);
      console.log(decoded);
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

  const login = async (user: z.infer<typeof loginSchema>) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/user/login/",
        user,
        {
          withCredentials: true,
        }
      );
      const token = response.data.accessToken;
      const decoded = jwtDecode<CustomJwtPayload>(token);
      console.log(decoded);
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
