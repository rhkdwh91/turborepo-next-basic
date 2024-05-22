"use client";

import axios from "axios";
import { getSession } from "next-auth/react";
import refreshAuthorize from "./refreshAuthorize";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
});

instance.interceptors.request.use(
  async (config) => {
    const session = await getSession();

    if (!session) {
      config.headers.accessToken = null;
      config.headers.refreshToken = null;
    }

    if (config.headers && session?.user) {
      const { accessToken, refreshToken } = session.user;
      config.headers.authorization = `Bearer ${accessToken}`;
      config.headers.refreshToken = `Bearer ${refreshToken}`;
    }
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
  function (response) {
    return response;
  },
  async (error) => {
    const {
      config,
      response: { status },
    } = error;
    if (status !== 401 && error.response.data.message !== "expired") {
      return Promise.reject(error);
    }

    await refreshAuthorize();
    const session = await getSession();
    if (!session?.user) {
      return Promise.reject(error);
    }
    const originalRequest = config;
    originalRequest.headers.authorization = `Bearer ${session.user.accessToken}`;
    return axios(originalRequest);
  },
);

export default instance;
