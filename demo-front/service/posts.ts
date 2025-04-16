import axios from "axios";

const BASE_URL = "https://dummyjson.com/posts";

export async function getPosts(page: number, limit = 5) {
  const skip = page * limit;
  const response = await axios.get(`${BASE_URL}?limit=${limit}&skip=${skip}`);
  return response.data;
}
