import axios from "axios";
import { getCookie } from "../actions/auth.action";
import { API } from "../config";
const token = getCookie("token");

const axiosInsatance = axios.create({
  baseURL: API,
  headers: {
    Accept: "application/json, application/xml, text/play, text/html, *.*",
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/x-www-form-urlencoded",
    Authorization: `Bearer ${token}`,
  },
});

export default axiosInsatance;
