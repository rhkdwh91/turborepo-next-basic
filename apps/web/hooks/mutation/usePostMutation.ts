import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "axiosInstance";
import { PostForm } from "types/post";

const usePostMutation = () => {
  const router = useRouter();

  const createPostMutation = useMutation({
    mutationFn: async (form: PostForm) => {
      await axiosInstance.post("/api/posts", form);
    },
    onSuccess: () => {
      alert("Successfully created post!");
      router.push("/");
    },
  });

  return {
    createPostMutation,
  };
};

export default usePostMutation;
