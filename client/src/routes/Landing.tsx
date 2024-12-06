// Landing.tsx

import { PostSm } from "@/components/post/Post";
import { PostList } from "@/components/post/Posts";

export const Home = () => {
  return (
    <div className="page-container flex justify-center content-center ">
      <div className="mt-24 min-w-[1150px] bg-[#091942]">
        <div className=" flex gap-4">
          <PostList />
        </div>
      </div>
    </div>
  );
};
