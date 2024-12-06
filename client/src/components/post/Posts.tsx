// Posts.tsx
import { useCallback, useEffect, useState } from "react";
import { PostSmProps } from "./Post";
import { fetchPosts } from "@/actions/postAction";
import { PostSm } from "./Post";
import { Button } from "../ui/button";

export const PostList = () => {
  const [posts, setPosts] = useState<PostSmProps[]>([]);

  const results = async () => {
    try {
      const response = await fetchPosts();
      setPosts(response.data.results);
    } catch (error) {
      console.error(error);
    }
  };

  useState(() => {
    results();
  });

  return (
    <div className="min-w-[775px] max-w-[800px] h-auto inline-flex flex-wrap justify-between px-2">
      {posts.length ? (
        <>
          {posts.map((post: PostSmProps) => (
            <PostSm key={post.id} post={parsePostSmResponse(post)} />
          ))}
        </>
      ) : (
        <p className="text-4xl mt-10 ml-10">Nothing to show...</p>
      )}
    </div>
  );
};

const parsePostSmResponse = (response: any): PostSmProps => {
  return {
    id: response.id,
    title: response.title,
    authorId: response.author,
    firstName: response.first_name,
    lastName: response.last_name,
    confidence: response.confidence,
    subject: mapSubject(response.subject),
  };
};

const mapSubject = (subject: string): PostSmProps["subject"] => {
  const subjectMap: Record<string, PostSmProps["subject"]> = {
    m: "Math",
    s: "Science",
    h: "History",
    a: "Art",
  };

  return subjectMap[subject] || "Misc";
};
