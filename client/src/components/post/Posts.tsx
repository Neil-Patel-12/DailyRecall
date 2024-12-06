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
      console.log(`Fetching page ${page}...`);
      const response = await fetchPosts(page, paginateBy);
      if (!response.data.hasMore) {
        setHasMore(false);
        return;
      }
      const newPosts = response.data.results;
      setPosts((prev) => [...prev, ...newPosts]);
      setPage((prev) => prev + 1);
      if (newPosts.length < paginateBy) {
        setHasMore(false);
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Error loading posts:", error);
      setHasMore(false);
      setIsLoading(false);
    }
  }, [page, isLoading, hasMore]);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting) {
        loadPosts();
      }
    },
    [loadPosts]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: "0px",
      threshold: 0.1, 
    });
    const sentinel = document.querySelector("#scroll-sentinel");
    if (sentinel) {
      observer.observe(sentinel);
    }
    return () => {
      if (sentinel) observer.unobserve(sentinel);
    };
  }, [handleObserver]);

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  return (
    <div className="min-w-[775px] max-w-[800px] h-auto inline-flex flex-wrap justify-between px-2">
      {posts.map((post) => (
        <PostSm key={post.id} post={parsePostSmResponse(post)} />
      ))}
      {isLoading && <div>Loading...</div>}
      {hasMore && !isLoading && (
        <Button type="button" onClick={loadPosts} disabled={isLoading}>
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
  const subjectMap: Record<string, PostSmProps["subject"]> = {
    m: "Math",
    s: "Science",
    h: "History",
    a: "Art",
  };

  return subjectMap[subject] || "Misc";
};
