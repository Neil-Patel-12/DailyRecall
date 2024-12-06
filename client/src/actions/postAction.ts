// postAction.ts
import { api } from "@/lib/api";
import { auth } from "./userAction";
import { PostSmProps } from "@/components/post/Post";
import axios from "axios";

const createPost = async () => {};

//************* */
const fetchPosts = async (
  pageNumber: number,
  paginateBy: number
): Promise<any> => {
  try {
    await auth(async () => {
      const response = await api.get("/api/posts/all", {
        params: { pageNumber, paginateBy },
      });
      console.log(response.data);
      return response.data;
    });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Error fetching tasks:", error.response?.data);
    }
    throw error;
  }
};

//**************/

const updatePost = async () => {};

const deletePost = async () => {};
export { createPost, updatePost, deletePost, fetchPosts };
