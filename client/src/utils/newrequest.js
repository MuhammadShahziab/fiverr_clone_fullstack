import axios from "axios";

const APIURL = "https://fiverr-clone-fullstack-1.onrender.com/api"; // Local development URL with HTTP

const newRequest = axios.create({
  baseURL: APIURL,
  withCredentials: true,
});

export default newRequest;
