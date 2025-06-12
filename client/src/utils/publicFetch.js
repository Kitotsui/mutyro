import axios from "axios";

const publicFetch = axios.create({
  withCredentials: false,
});

export default publicFetch;
