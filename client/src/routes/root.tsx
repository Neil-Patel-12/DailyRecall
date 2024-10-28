// Root.tsx

import { Routes, Route } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Home } from "@/routes/Landing";
import "@/index.css";
import { Signup } from "./auth/Signup";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/*" element={<Home />} />
        <Route path="/signup" element={<Signup/>} />
      </Routes>
    </>
  );
};

export default App;
