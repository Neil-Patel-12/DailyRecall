// Posts.tsx
import { useEffect, useState } from "react";
import { PostLg, PostSmProps } from "./Post";
import { fetchPosts, fetchPostsByTopic } from "@/actions/postAction";
import { PostSm } from "./Post";

interface PostListProps {
  userId?: number;
  selectedTopicId?: number | null;
}

export const PostList = ({ userId }: PostListProps) => {
  const [posts, setPosts] = useState<PostSmProps[]>([]);

  const results = async () => {
    try {
      const response = await fetchPosts();
      const parsed = response.data.map(parsePostSmResponse);
      setPosts(parsed);
    } catch (error) {
      console.error("Failed to fetch posts:", error);
    }
  };

  useEffect(() => {
    results();
  }, []);

  const filteredPosts = userId
    ? posts.filter((post) => post.authorId === userId)
    : posts;

  console.log(filteredPosts);

  return (
    <div className="min-w-[775px] max-w-[800px] h-auto inline-flex flex-wrap justify-between px-2">
      {posts.length > 0 ? (
        <>
          {filteredPosts.map((post: PostSmProps) => (
            <PostLg key={post?.id}>
              <PostSm post={post} />
            </PostLg>
          ))}
        </>
      ) : (
        <p className="text-4xl mt-10 ml-10">Nothing to show...</p>
      )}
    </div>
  );
};

export const PostListByTopic = ({ userId, selectedTopicId }: PostListProps) => {
  const [posts, setPosts] = useState<PostSmProps[]>([]);

  const fetchPosts = async () => {
    try {
      if (!userId) return; // Ensure userId is provided
      const response = await fetchPostsByTopic(userId, selectedTopicId || null);

      console.log("selectedTopicId:", selectedTopicId);
      console.log("Posts:", response);
      const parsed = response.data.results.map(parsePostSmResponse);
      setPosts(parsed); // Assuming response.data contains the posts array
    } catch (error) {
      console.error("Failed to fetch posts:", error);
    }
  };

  // Fetch posts whenever userId or selectedTopicId changes
  useEffect(() => {
    fetchPosts();
  }, [userId, selectedTopicId]);

  return (
    <div className="min-w-[775px] max-w-[800px] h-auto inline-flex flex-wrap justify-between px-2">
      {posts.length > 0 ? (
        <>
          {posts.map((post: PostSmProps) => (
            <PostLg key={post?.id}>
              <PostSm post={post} />
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
