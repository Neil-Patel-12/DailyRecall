// Profile.tsx

import useAuth from "@/contexts/AuthContext";
import { UserCircle } from "lucide-react";
import icon from "/icon.png";
import { Link, useNavigate } from "react-router-dom";
import { fetchUserPosts } from "@/actions/postAction";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export const Profile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [numPosts, setNumPosts] = useState(0);
  const fetchPosts = async () => {
    try {
      if (!user) {
        console.error("User is not defined.");
        return;
      }
      const response = await fetchUserPosts(user.id);
      if (response) {
        setNumPosts(response.data.results.length);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="page-container flex justify-center">
      <div className="content-container mt-5 flex flex-col px-16">
        <div className="flex">
          <h1 className="text-6xl font-bold mt-auto mb-10">{`Hello,  ${user?.firstName}!`}</h1>
          <img
            className="transform scale-x-[-1] w-[250px] ml-auto mt-10"
            src={icon}
          />
        </div>
        <hr className="my-4 w-[400px]" />
        <div className="mt-8 text-xl flex">
          <p>Name: </p>
          <p className="mx-4 font-bold ">
            {`${user?.firstName} ${user?.lastName}`}
          </p>
        </div>
        <div className=" mt-4 text-xl flex">
          <p>Email: </p>
          <p className="mx-4 font-bold ">
            {`${user?.email}`}
          </p>
        </div>
        <div className=" mt-4 text-xl flex">
          <p>Password: </p>
          <p className="mx-4 mt-1.5 font-bold ">
            *****************
          </p>
        </div>
        
        <Button onClick={() => navigate("/user/settings")} className="max-w-[200px] m-5">
          Edit
        </Button>
        <hr className="my-4 w-[400px]" />
        <div className="my-16 text-xl flex">
          <p>Number of Posts: </p>
          <Link
            className="mx-4 font-bold text-accent underline hover:text-white transition-all ease-in-out duration-200"
            to="/user/posts"
          >
            {numPosts}
          </Link>
        </div>
        <div className="text-xl flex">
          <p className="mr-2">Number of Topics: </p>
          <Link
            className="mx-4 font-bold text-accent underline hover:text-white transition-all ease-in-out duration-200"
            to="/user/posts"
          >
            {numPosts}
          </Link>
        </div>
      </div>
    </div>
  );
};
