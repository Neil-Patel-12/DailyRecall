// postAction.ts
import { api } from "@/lib/api";
import { auth } from "./userAction";
import { PostSmProps } from "@/components/post/Post";
import axios from "axios";


const createPost = async () => {
  auth(async () => {
    const response = await api.post("/api/posts/create", postData);
    console.log(response);
    return response;
  });
};

//************* */
// PUBLIC
const fetchPosts = async (): Promise<any> => {
  try {
    const response = await api.get("/api/posts/all", {});
    console.log(response);
    return response;
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
