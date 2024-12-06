// TopicGrowth.tsx

import { PostListByTopic } from "@/components/post/Posts";
import { TopicDropdown } from "@/components/topic/TopicDrowdown";
import useAuth from "@/contexts/AuthContext";
import { useState } from "react";

export const TopicGrowth = () => {
  const { user } = useAuth();
  const [selectedTopicId, setSelectedTopicId] = useState<number | null>(null);

  return (
    <div className="page-container flex justify-center ">
      <div className="content-container mt-24">
        <div className="flex flex-col my-5 gap-4">
            <div className="w-full flex justify-center ">
                <TopicDropdown onSelectTopic={(id) => setSelectedTopicId(id)}/>
                <PostListByTopic userId={user?.id} selectedTopicId={selectedTopicId}/>
            </div>
            {/* DISPLAY POSTS BY TOPIC */}
        </div>
      </div>
    </div>
  );
};
