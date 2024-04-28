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
        backgroundColor: "#3182CE",
        color: "#ffffff",
      });
      router.push("/");
    },
    onError: () => {
      toast("Failed created user!", {
        backgroundColor: "#E53E3E",
        color: "#ffffff",
      });
    },
  });

  const signInUserMutation = useMutation({
    mutationFn: async (form: UserForm) => {
      const { data } = await axiosInstance.post("/api/user/sign-in", form);
      return data;
    },
    onSuccess: (userInfo: User) => {
      toast("Successfully login user!", {
        backgroundColor: "#3182CE",
        color: "#ffffff",
      });
      setUserInfo({ username: userInfo.username, email: userInfo.email });
      router.push("/");
    },
    onError: () => {
      toast("Failed login user!", {
        backgroundColor: "#E53E3E",
        color: "#ffffff",
      });
    },
  });

  const signOutUserMutation = useMutation({
    mutationFn: async () => {
      await axiosInstance.post("/api/user/sign-out");
    },
    onSuccess: () => {
      toast("Successfully logout user!", {
        backgroundColor: "#3182CE",
        color: "#ffffff",
      });
      deleteUserInfo();
      router.push("/");
    },
    onError: () => {
      toast("Failed logout user!", {
        backgroundColor: "#E53E3E",
        color: "#ffffff",
      });
    },
  });

  return {
    createUserMutation,
    signInUserMutation,
    signOutUserMutation,
  };
};

export default useUserMutation;
