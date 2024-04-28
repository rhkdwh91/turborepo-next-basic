import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "axiosInstance";
import { PostForm } from "types/post";
import { toast } from "kyz-toast";

const usePostMutation = () => {
  const router = useRouter();

  const createPostMutation = useMutation({
    mutationFn: async (form: PostForm) => {
      await axiosInstance.post("/api/posts", form);
    },
    onSuccess: () => {
      toast("Successfully created post!", {
        backgroundColor: "#8329C5",
        color: "#ffffff",
      });
      router.push("/");
    },
  });

  return {
    createPostMutation,
  };
};

export default usePostMutation;
