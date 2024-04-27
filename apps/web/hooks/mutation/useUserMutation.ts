import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "axiosInstance";
import { User, UserForm } from "types/user";
import useUserInfo from "hooks/useUserInfo";

const useUserMutation = () => {
  const router = useRouter();
  const { setUserInfo } = useUserInfo();

  const createUserMutation = useMutation({
    mutationFn: async (form: UserForm) => {
      await axiosInstance.post("/api/user/sign-up", form);
    },
    onSuccess: () => {
      alert("Successfully created user!");
      router.push("/");
    },
  });

  const signInUserMutation = useMutation({
    mutationFn: async (form: UserForm) => {
      const { data } = await axiosInstance.post("/api/user/sign-in", form);
      return data;
    },
    onSuccess: (userInfo: User) => {
      alert("Successfully login user!");
      setUserInfo({ username: userInfo.username, email: userInfo.email });
      router.push("/");
    },
  });

  return {
    createUserMutation,
    signInUserMutation,
  };
};

export default useUserMutation;
