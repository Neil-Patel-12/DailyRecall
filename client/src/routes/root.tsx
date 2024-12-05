// Root.tsx

import { Routes, Route } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Home } from "@/routes/Landing";
import { AuthRoutes } from "./auth/authRoutes";
import { UserRoutes } from "./user/userRoutes";
import { PrivateRoute } from "./auth/ProtectedRoutes";
import "@/index.css";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/*" element={<Home />} />
        <Route path="/auth/*" element={<AuthRoutes />} />
        <Route
          path="/user/*"
          element={
            <PrivateRoute>
              <UserRoutes />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
};

export default App;
