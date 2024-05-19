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

    //요청시 AccessToken 계속 보내주기
    if (!session) {
      config.headers.accessToken = null;
      config.headers.refreshToken = null;
    }

    if (config.headers && session && session.user) {
      const { accessToken, refreshToken } = session.user;
      config.headers.authorization = `Bearer ${accessToken}`;
      config.headers.refreshToken = `Bearer ${refreshToken}`;
    }
    // Do something before request is sent
    console.log("request start", config);
    return config;
  },
  function (error) {
    // Do something with request error
    console.log("request error", error);
    return Promise.reject(error);
  },
);

// Add a response interceptor
instance.interceptors.response.use(
  async (response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    console.log("get response", response);
    return response;
  },
  async (error) => {
    const {
      config,
      response: { status },
    } = error;
    if (status === 401 && error.response.data.message !== "expired") {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      console.log("response error", error);
      return Promise.reject(error);
    }
    const session = await getServerSession(AuthConfig);
    if (!session?.user) {
      return Promise.reject(error);
    }
    const originalRequest = config;
    const { refreshToken } = session.user;
    // token refresh 요청
    const { data } = await axios.post(
      `http://localhost:3000/refreshToken`, // token refresh api
      {},
      { headers: { authorization: `Bearer ${refreshToken}` } },
    );
    // 새로운 토큰 저장
    // dispatch(userSlice.actions.setAccessToken(data.data.accessToken)); store에 저장
    const { accessToken: newAccessToken, refreshToken: newRefreshToken } = data;
    await localStorage.multiSet([
      ["accessToken", newAccessToken],
      ["refreshToken", newRefreshToken],
    ]);
    originalRequest.headers.authorization = `Bearer ${newAccessToken}`;
    // 401로 요청 실패했던 요청 새로운 accessToken으로 재요청
    return axios(originalRequest);
  },
);

export default instance;
