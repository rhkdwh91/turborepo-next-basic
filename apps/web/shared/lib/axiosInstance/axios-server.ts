import axios from "axios";
import { auth } from "@/auth";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
});

instance.interceptors.request.use(
  async (config) => {
    const session = await auth();

    if (!session) {
      config.headers.accessToken = null;
      config.headers.refreshToken = null;
    }

    if (config.headers && session && session.user) {
      const { accessToken, refreshToken } = session.user;
      config.headers.authorization = `Bearer ${accessToken}`;
      config.headers.refreshToken = `Bearer ${refreshToken}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

// Add a response interceptor
instance.interceptors.response.use(
  async (response) => {
    return response;
  },
  async (error) => {
    const {
      config,
      response: { status },
    } = error;
    console.log(error.response.data.message);
    if (status === 401 && error.response.data.message !== "expired") {
      return Promise.reject(error);
    }
    const session = await auth();
    if (!session?.user) {
      return Promise.reject(error);
    }
    const originalRequest = config;
    const { refreshToken } = session.user;
    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/refresh-token`, // token refresh api
      {},
      { headers: { authorization: `Bearer ${refreshToken}` } },
    );
    originalRequest.headers.authorization = `Bearer ${data.accessToken}`;
    return axios(originalRequest);
  },
);

export default instance;
