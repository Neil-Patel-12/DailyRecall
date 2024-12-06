// userRoutes.tsx

import { Routes, Route } from "react-router-dom";
import { Profile } from "./Profile";
import { MyPosts } from "./MyPosts";
import { Settings } from "./Settings";

export const UserRoutes = () => {
  return (
    <Routes>
      <Route index element={<Profile />} />
      <Route path="profile/*" element={<Profile />} />
      <Route path="posts/*" element={<MyPosts />} />
      <Route path="topics/*" element={<Settings />} />
      <Route path="settings/*" element={<Settings />} />
    </Routes>
  );
};
