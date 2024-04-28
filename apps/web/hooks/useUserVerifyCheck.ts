import { useEffect } from "react";
import useUserInfo from "./useUserInfo";
import axiosInstance from "../axiosInstance";

const useUserVerifyCheck = () => {
  const { setUserInfo } = useUserInfo();

  const userCheck = async () => {
    try {
      const { data } = await axiosInstance.get("/api/user/verify-check");
      setUserInfo(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    userCheck();
  }, []);
};

export default useUserVerifyCheck;
