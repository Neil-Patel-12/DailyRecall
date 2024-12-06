// MyPosts.tsx

import { PostList } from "@/components/post/Posts";
import useAuth from "@/contexts/AuthContext";

export const MyPosts = () => {
  const { user } = useAuth();
  return (
    <div className="page-container flex justify-center ">
      <div className="content-container mt-24">
        <div className=" flex gap-4">
          <PostList userId={user?.id}/>
        </div>
      </div>
    </div>
  );
};
