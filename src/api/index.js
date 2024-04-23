import axios from "axios";

const API = axios.create({ baseURL: process.env.REACT_APP_BASE_URL });
API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});

export const fetchPost = (id) => API.get(`/post/${id}`);
export const fetchPosts = (page) => API.get(`/post?page=${page}`);
export const createPost = (newPost) =>
  API.post("/post", newPost, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
export const updatePost = (id, updatedPost) =>
  API.put(`/post/${id}`, updatedPost, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
export const deletePost = (id) => API.delete(`/post/${id}`);
export const likePost = (id) => API.patch(`/post/${id}/likePost`);
export const commentPost = (value, id) =>
  API.post(`/post/${id}/comment`, value);
export const fetchPostsBySearch = (searchQuery) =>
  API.get(
    `/post/search?searchQuery=${searchQuery.searchField || "none"}&tags=${
      searchQuery.tags
    }`
  );

export const signin = (FormData) => API.post("/auth/login", FormData);
export const signup = (FormData) => API.post("/auth/signup", FormData);
