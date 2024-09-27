import axios from "axios";

const APIURL = "https://fiverr-clone-fullstack.vercel.app/api";

const newRequest = axios.create({
  baseURL: APIURL, // Reads from environment variables
  withCredentials: true,
});
export default newRequest;
