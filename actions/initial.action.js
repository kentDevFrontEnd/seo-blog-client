import axiosInsatance from "../api";

export const getInitialData = async () => {
  try {
    const res = await axiosInsatance.get(`/initialData`);

    return res;
  } catch (error) {
    console.log(error);
  }
};
