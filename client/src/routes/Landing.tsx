// Landing.tsx

import { PostSm } from "@/components/post/Post";
import { PostList } from "@/components/post/Posts";

export const Home = () => {
  return (
    <div className="page-container flex justify-center ">
      <div className="content-container mt-24">
        <div className=" flex gap-4">
          <PostList />
        </div>
      </div>
    </div>
  );
};
