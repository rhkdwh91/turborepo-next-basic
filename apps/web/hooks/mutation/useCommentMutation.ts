import { useMutation } from "@tanstack/react-query";
import axiosInstance from "axiosInstance";
import { toast } from "kyz-toast";
import { CommentForm } from "types/comment";

const useCommentMutation = () => {
  const createCommentMutation = useMutation({
    mutationFn: async (form: CommentForm) => {
      const { data } = await axiosInstance.post("/api/comment", form);
      return data;
    },
    onSuccess: () => {
      toast.success("Successfully created comment!");
    },
    onError: (error) => {
      toast.error("Failed create post");
      console.error(error);
    },
  });

  const modifyCommentMutation = useMutation({
    mutationFn: async (form: CommentForm) => {
      const { data } = await axiosInstance.put(
        "/api/comment/" + form.uid,
        form,
      );
      return data;
    },
    onSuccess: () => {
      toast.success("Successfully modify comment!");
    },
    onError: (error) => {
      toast.error("Failed modify post");
      console.error(error);
    },
  });

  const deleteCommentMutation = useMutation({
    mutationFn: async (uid: number) => {
      const { data } = await axiosInstance.delete("/api/comment/" + uid);
      return data;
    },
    onSuccess: () => {
      toast.success("Successfully delete comment!");
    },
  });

  return {
    createCommentMutation,
    modifyCommentMutation,
    deleteCommentMutation,
  };
};

export default useCommentMutation;
