import fetch from "isomorphic-fetch";

import { API } from "../config";

export const createTag = async (tag, token) => {
  try {
    const res = await fetch(`${API}/tag/create`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(tag),
    });
    return await res.json();
  } catch (error) {
    console.log(error);
  }
};

export const getAllTags = async () => {
  try {
    const res = await fetch(`${API}/tag`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
    });
    return await res.json();
  } catch (error) {
    console.log(error);
  }
};

export const getOneTag = async (slug, token) => {
  try {
    const res = await fetch(`${API}/tag/${slug}`, {
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
  }
};
export const updateTag = async (slug, tag, token) => {
  try {
    const res = await fetch(`${API}/tag/${slug}`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(tag),
    });
    return await res.json();
  } catch (error) {
    console.log(error);
  }
};

export const deleteOneTag = async (slug, token) => {
  try {
    const res = await fetch(`${API}/tag/${slug}`, {
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
  }
};
