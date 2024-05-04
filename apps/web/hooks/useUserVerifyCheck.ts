import { useEffect, useState } from "react";
import useModal from "./useModal";
import axiosInstance from "../axiosInstance";

const useUserVerifyCheck = () => {
  const { setUserInfo } = useModal();
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
