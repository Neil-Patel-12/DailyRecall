// postAction.ts
import { api } from "@/lib/api";
import { PostSmProps } from "@/components/post/Post";
import axios from "axios";

// const createPost = async () => {
//   auth(async () => {
//     const response = await api.post("/api/posts/create", postData);
//     console.log(response);
//     return response;
//   });
// };

//************* */
// PUBLIC
const fetchPosts = async (): Promise<any> => {
  try {
    const response = await api.get("/api/posts/all", {});
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Error fetching tasks:", error);
    }
    throw error;
  }
};
//**************/

const fetchUserPosts = async (userId: number): Promise<any> => {
  try {
    const response = await api.get(`/api/posts/user/${userId}`, {});
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Error fetching tasks:", error.response?.data);
    }
    throw error;
  }
};

const fetchPostsByTopic = async (
  userId: number,
  topicId: number | null
): Promise<any> => {
  try {
    const response = await api.get(
      `/api/posts/user/${userId}/topic/${topicId}/`,
      {}
    );
    console.log("API Response:", response.data);
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Error fetching posts:",
        error.response?.data || error.message
      );
    }
    throw error;
  }
};

const updatePost = async () => {};

const deletePost = async () => {};
export {
  updatePost,
  deletePost,
  fetchPosts,
  fetchUserPosts,
  fetchPostsByTopic,
};
