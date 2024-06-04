import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/axiosInstance/axios-client";
import { UserForm } from "@/types/user";
import { toast } from "kyz-toast";

export const useUserLevelMutation = () => {
  return useMutation({
    mutationFn: async (form: { level: number; uid: number }) => {
      const { data } = await axiosInstance.put(
        `/api/user/${form.uid}/level/`,
        form,
      );
      return data;
    },
    onSuccess: () => {
      toast.success("Successfully modified user level!");
    },
    onError: () => {
      toast.error("Failed modified user level!");
    },
  });
};

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
