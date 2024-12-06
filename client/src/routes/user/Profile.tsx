// Profile.tsx

import useAuth from "@/contexts/AuthContext";
import { UserCircle } from "lucide-react";


export const Profile = () => {
  const { user } = useAuth();
  
  return (
    <div className="page-container flex justify-center">
      <div className="content-container mt-5 flex flex-col px-16">
        <UserCircle size={250} className="ml-auto mt-12 text-accent"/>
        <h1 className="text-6xl font-bold">{`Hello ${user?.firstName}!`}</h1>
      </div>
    </div>
  );
};
