import { useEffect } from "react";
import useUserInfo from "./useUserInfo";
import axiosInstance from "../axiosInstance";

const useUserVerifyCheck = () => {
  const { setUserInfo } = useUserInfo();

  const userCheck = async () => {
    const { data } = await axiosInstance.get("/api/user/verify-check");
    setUserInfo(data);
  };

  useEffect(() => {
    userCheck();
  }, []);
};

export default useUserVerifyCheck;
