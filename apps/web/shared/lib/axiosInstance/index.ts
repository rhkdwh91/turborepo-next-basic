import axiosClient from "./axios-client";
import axiosServer from "./axios-server";

const instance = typeof window !== "undefined" ? axiosClient : axiosServer;

export default instance;
