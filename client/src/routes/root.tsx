// Root.tsx

import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Home } from "@/routes/Landing";
import "@/index.css";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/*" element={<Home />} />
      </Routes>
    </>
  );
};

export default App;
