import axios from "axios";

const APIURL = "https://fiverr-clone-api.vercel.app/api"; // Local development URL with HTTP

const newRequest = axios.create({
  baseURL: APIURL,
  withCredentials: true,
});

export default newRequest;
