import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "axiosInstance";
import { PostForm } from "types/post";
import { toast } from "kyz-toast";

const usePostMutation = () => {
  const router = useRouter();

  const createPostMutation = useMutation({
    mutationFn: async (form: PostForm) => {
      const { data } = await axiosInstance.post("/api/posts", form);
      return data;
    },
    onSuccess: () => {
      toast("Successfully created post!", {
        backgroundColor: "#8329C5",
        color: "#ffffff",
      });
      router.push("/");
    },
    onError: (error) => {
      toast("some Error", {
        backgroundColor: "#8329C5",
        color: "#ffffff",
      });
      console.error(error);
    },
  });

  const deletePostMutation = useMutation({
    mutationFn: async (uid: number) => {
      const { data } = await axiosInstance.delete("/api/posts/" + uid);
      return data;
    },
    onSuccess: () => {
      toast("Successfully delete post!", {
        backgroundColor: "#8329C5",
        color: "#ffffff",
      });
    },
  });

  return {
    createPostMutation,
    deletePostMutation,
  };
};

export default usePostMutation;
