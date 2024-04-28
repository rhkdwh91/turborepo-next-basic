import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "axiosInstance";
import { User, UserForm } from "types/user";
import useUserInfo from "hooks/useUserInfo";
import { toast } from "kyz-toast";

const useUserMutation = () => {
  const router = useRouter();
  const { setUserInfo, deleteUserInfo } = useUserInfo();

  const createUserMutation = useMutation({
    mutationFn: async (form: UserForm) => {
      await axiosInstance.post("/api/user/sign-up", form);
    },
    onSuccess: () => {
      toast("Successfully created user!", {
        backgroundColor: "#8329C5",
        color: "#ffffff",
      });
      router.push("/");
    },
  });

  const signInUserMutation = useMutation({
    mutationFn: async (form: UserForm) => {
      const { data } = await axiosInstance.post("/api/user/sign-in", form);
      return data;
    },
    onSuccess: (userInfo: User) => {
      toast("Successfully login user!", {
        backgroundColor: "#8329C5",
        color: "#ffffff",
      });
      setUserInfo({ username: userInfo.username, email: userInfo.email });
      router.push("/");
    },
  });

  const signOutUserMutation = useMutation({
    mutationFn: async () => {
      await axiosInstance.post("/api/user/sign-out");
    },
    onSuccess: () => {
      toast("Successfully logout user!", {
        backgroundColor: "#8329C5",
        color: "#ffffff",
      });
      deleteUserInfo();
      router.push("/");
    },
  });

  return {
    createUserMutation,
    signInUserMutation,
    signOutUserMutation,
  };
};

export default useUserMutation;
