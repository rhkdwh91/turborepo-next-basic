import axios from "axios";

const instance = axios.create({
  baseURL: typeof window === "undefined" ? "http://localhost:3000" : undefined,
  timeout: 1000,
});

export default instance;
