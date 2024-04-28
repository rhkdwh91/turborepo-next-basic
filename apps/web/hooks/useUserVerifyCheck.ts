import { useEffect, useState } from "react";
import useUserInfo from "./useUserInfo";
import axiosInstance from "../axiosInstance";

const useUserVerifyCheck = () => {
  const { setUserInfo } = useUserInfo();
  const [isHydration, setIsHydration] = useState(false);

  const userCheck = async () => {
    try {
      const { data } = await axiosInstance.get("/api/user/verify-check");
      setUserInfo(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsHydration(true);
    }
  };

  useEffect(() => {
    userCheck();
  }, []);

  return { isHydration };
};

export default useUserVerifyCheck;
