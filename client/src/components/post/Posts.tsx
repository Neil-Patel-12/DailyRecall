// Posts.tsx
import { useCallback, useEffect, useState } from "react";
import { PostSmProps } from "./Post";
import { fetchPosts } from "@/actions/postAction";
import { PostSm } from "./Post";
import { Button } from "../ui/button";

export const PostList = () => {
  const [posts, setPosts] = useState<PostSmProps[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const paginateBy = 10;

  const loadPosts = useCallback(async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    try {
      const response = await fetchPosts(page, paginateBy);
      const newPosts = response.data.posts;
      setPosts((prev) => [...prev, ...newPosts]);
      setPage((prev) => prev + 1);
      if (newPosts.length < paginateBy) {
        setHasMore(false);
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Error loading posts:", error);
    }
  }, [page, isLoading, hasMore]);

  const handleLoadPosts = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); 
    loadPosts(); 
  };

  return (
    <div className="min-w-[775px] max-w-[800px] inline-flex flex-wrap justify-between px-2">
      {posts.map((post) => (
        <PostSm key={post.id} post={parsePostSmResponse(post)} />
      ))}
      {isLoading && <div>Loading...</div>}
      {hasMore && (
        <Button type="button" onClick={handleLoadPosts} disabled={isLoading}>
          Load More
        </Button>
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
  const validSubjects: PostSmProps["subject"][] = [
    "Math",
    "Science",
    "History",
    "Art",
    "Misc",
  ];

  if (validSubjects.includes(subject as PostSmProps["subject"])) {
    return subject as PostSmProps["subject"];
  }

  return "Misc";
};
