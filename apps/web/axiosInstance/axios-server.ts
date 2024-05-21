import axios from "axios";
import { getServerSession } from "next-auth";
import AuthConfig from "auth.config";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
});

instance.interceptors.request.use(
  async (config) => {
    const session = await getServerSession(AuthConfig);

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
    if (status === 401 && error.response.data.message !== "expired") {
      return Promise.reject(error);
    }
    const session = await getServerSession(AuthConfig);
    if (!session?.user) {
      return Promise.reject(error);
    }
    const originalRequest = config;
    const { refreshToken } = session.user;
    const { data } = await axios.post(
      `http://localhost:3000/api/auth/refreshToken`, // token refresh api
      {},
      { headers: { authorization: `Bearer ${refreshToken}` } },
    );
    const { accessToken: newAccessToken } = data;
    originalRequest.headers.authorization = `Bearer ${newAccessToken}`;
    // 401로 요청 실패했던 요청 새로운 accessToken으로 재요청
    return axios(originalRequest);
  },
);

export default instance;
