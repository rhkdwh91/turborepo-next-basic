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
      toast.success("Successfully created user!");
      router.push("/");
    },
    onError: () => {
      toast.error("Failed created user!");
    },
  });

  const signInUserMutation = useMutation({
    mutationFn: async (form: UserForm) => {
      const { data } = await axiosInstance.post("/api/user/sign-in", form);
      return data;
    },
    onSuccess: (userInfo: User) => {
      toast.success("Successfully login user!");
      setUserInfo({ username: userInfo.username, email: userInfo.email });
      router.push("/");
    },
    onError: () => {
      toast.error("Failed login user!");
    },
  });

  const signOutUserMutation = useMutation({
    mutationFn: async () => {
      await axiosInstance.post("/api/user/sign-out");
    },
    onSuccess: () => {
      toast.success("Successfully logout user!");
      deleteUserInfo();
      router.push("/");
    },
    onError: () => {
      toast.error("Failed logout user!");
    },
  });

  return {
    createUserMutation,
    signInUserMutation,
    signOutUserMutation,
  };
};

export default useUserMutation;
