import fetch from "isomorphic-fetch";

import { API } from "../config";

export const createCategory = async (category, token) => {
  try {
    const res = await fetch(`${API}/category/create`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(category),
    });
    return await res.json();
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
};

export const getAllCategories = async () => {
  try {
    const res = await fetch(`${API}/category`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
    });
    return await res.json();
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
};

export const getOneCategory = async (slug, token) => {
  try {
    const res = await fetch(`${API}/category/${slug}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return await res.json();
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
};
export const updateCategory = async (slug, category, token) => {
  try {
    const res = await fetch(`${API}/category/${slug}`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(category),
    });
    return await res.json();
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
};

export const deleteOneCategory = async (slug, token) => {
  try {
    const res = await fetch(`${API}/category/${slug}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return await res.json();
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
};
