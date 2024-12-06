// Posts.tsx
import { useEffect, useState } from "react";
import { PostLg, PostSmProps } from "./Post";
import { fetchPosts } from "@/actions/postAction";
import { PostSm } from "./Post";

export const PostList = ({ userId }: { userId?: number }) => {
  const [posts, setPosts] = useState<PostSmProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const results = async () => {
    try {
      const response = await fetchPosts();
      setPosts(response.data);
    } catch (error) {
      console.error("Failed to fetch posts:", error);
      setError("Failed to load posts.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    results();
  }, []);

  const filteredPosts = userId
    ? posts.filter((post) => post.authorId === userId)
    : posts;

  return (
    <div className="min-w-[775px] max-w-[800px] h-auto inline-flex flex-wrap justify-between px-2">
      {posts.length > 0 ? (
        <>
          {filteredPosts.map((post: PostSmProps) => (
            <PostLg key={post?.id}>
              <PostSm post={parsePostSmResponse(post)} />
            </PostLg>
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
