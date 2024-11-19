// ProtectedRoute.tsx

import { ReactNode } from "react";
import useAuth from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";

export const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();

  return user ? children : <Navigate to="/login" />;
};
