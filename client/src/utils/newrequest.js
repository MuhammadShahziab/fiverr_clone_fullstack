import axios from "axios";
const newRequest = axios.create({
  baseURL: "https://fiverr-clone-fullstack.vercel.app/api",
  withCredentials: true,
});
export default newRequest;
