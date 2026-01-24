import axios from "axios";
import { Post } from "@/type/item";

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  timeout: 10000,
});

export const fetchPosts = async (): Promise<Post[]> => {
  try {
    const response = await api.get<Post[]>("/posts");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    throw error;
  }
};
