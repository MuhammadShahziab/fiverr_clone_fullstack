import axios from "axios";

const APIURL = "http://localhost:8800/api"; // Local development URL with HTTP

const newRequest = axios.create({
  baseURL: APIURL,
  withCredentials: true,
});

export default newRequest;
