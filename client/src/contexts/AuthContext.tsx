// AuthContext.tsx

import { loginSchema } from "@/components/auth/loginForm";
import { signupSchema } from "@/components/auth/signupForm";
import { createContext, ReactNode, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

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
  signup: (user: z.infer<typeof signupSchema>) => Promise<void>;
  login: (user: z.infer<typeof loginSchema>) => Promise<void>;
  logout: () => void;
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

  const signup = async () => {
    navigate("/home");
  };

  const login = async () => {
    navigate("/home");
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
