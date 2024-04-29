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
      toast.success("Successfully created post!");
      router.push("/");
    },
    onError: (error) => {
      toast.error("Failed create post");
      console.error(error);
    },
  });

  const modifyPostMutation = useMutation({
    mutationFn: async (form: PostForm) => {
      const { data } = await axiosInstance.put("/api/posts/" + form.uid, form);
      return data;
    },
    onSuccess: () => {
      toast.success("Successfully modify post!");
      router.push("/");
    },
    onError: (error) => {
      toast.error("Failed modify post");
      console.error(error);
    },
  });

  const deletePostMutation = useMutation({
    mutationFn: async (uid: number) => {
      const { data } = await axiosInstance.delete("/api/posts/" + uid);
      return data;
    },
    onSuccess: () => {
      toast.success("Successfully delete post!");
      router.push("/");
    },
  });

  return {
    createPostMutation,
    modifyPostMutation,
    deletePostMutation,
  };
};

export default usePostMutation;
