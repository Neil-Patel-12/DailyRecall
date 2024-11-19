// Root.tsx

import { Routes, Route } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Home } from "@/routes/Landing";
import "@/index.css";
import { AuthRoutes } from "./auth/authRoutes";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/*" element={<Home />} />
        <Route path="/user/*" element={<AuthRoutes/>} />
      </Routes>
    </>
  );
};

export default App;
