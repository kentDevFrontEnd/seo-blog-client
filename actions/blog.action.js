import fetch from "isomorphic-fetch";
import axiosInstance from "../api";

export const createBlog = async (blog) => {
  try {
    const res = await axiosInstance.post(`/blog/create`, blog);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getAllBlogs = async (page, limit) => {
  try {
    const res = await axiosInstance.get(`/blog?page=${page}&limit=${limit}`);

    return res.data;
  } catch (error) {
    console.log(error.response.data.error);
  }
};

export const getOneBlog = async (slug) => {
  try {
    const res = await axiosInstance.get(`/blog/${slug}`);
    // console.log(res.data);

    return res.data;
  } catch (error) {
    console.log(error.response.data.error);
  }
};
