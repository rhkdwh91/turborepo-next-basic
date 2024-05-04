import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "axiosInstance";
import { User, UserForm } from "types/user";
import { toast } from "kyz-toast";

const useUserMutation = () => {
  const router = useRouter();

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
    onSuccess: () => {
      toast.success("Successfully login user!");
      router.push("/");
    },
    onError: () => {
      toast.error("Failed login user!");
    },
  });

  return {
    createUserMutation,
    signInUserMutation,
  };
};

export default useUserMutation;
