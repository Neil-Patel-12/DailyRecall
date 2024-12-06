// topicAction.ts

import { api } from "@/lib/api";
import axios from "axios";

const fetchTopics = async (userId: number) => {
  try {
    const response = await api.get(`/api/topics/user/${userId}`, {});
    console.log(response);
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Error fetching tasks:", error);
    }
    throw error;
  }
};



// const createTopic = async (userId: number, topicName: 

export { fetchTopics };
