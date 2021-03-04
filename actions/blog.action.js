import fetch from "isomorphic-fetch";
import queryString from "query-string";
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
    return error.response.data;
  }
};

export const getBlogsWithSearchTerm = async (term) => {
  try {
    console.log(term);
    let searchString = queryString.stringify(term);

    console.log(searchString);
    const res = await axiosInstance.get(`/blog/search?${searchString}`);

    return res.data;
  } catch (error) {
    console.log(error.response.data.error);
    return error.response.data;
  }
};

export const getOneBlog = async (slug) => {
  try {
    const res = await axiosInstance.get(`/blog/${slug}`);
    // console.log(res.data);

    return res.data;
  } catch (error) {
    console.log(error.response.data.error);
    return error.response.data;
  }
};

export const removeBlog = async (id) => {
  try {
    const res = await axiosInstance.delete(`/blog/${id}`);

    return res.data;
  } catch (error) {
    console.log(error.response.data.error);
    return error.response.data;
  }
};

export const updateBlog = async (data, id) => {
  try {
    const res = await axiosInstance.patch(`/blog/${id}`, data);

    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error.response.data.error);
    return error.response.data;
  }
};
