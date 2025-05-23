import axios from "axios";

const publicFetch = axios.create({
  baseURL: "/api/v1",
  withCredentials: false,
});

export default publicFetch;
