import { useQueryClient, useMutation } from "@tanstack/react-query";
import axiosInstance from "axiosInstance";
import { toast } from "kyz-toast";
import { CommentForm } from "types/comment";
import { queryKeys } from "queryKeys";

const useCommentMutation = () => {
  const queryClient = useQueryClient();
  const createCommentMutation = useMutation({
    mutationFn: async (form: CommentForm) => {
      const { data } = await axiosInstance.post("/api/comments", form);
      return data;
    },
    onSuccess: (_, variables) => {
      toast.success("Successfully created comment!");
      queryClient.refetchQueries({
        queryKey: queryKeys.posts.detail(variables.postUid).queryKey,
        type: "active",
      });
    },
    onError: (error) => {
      toast.error("Failed create post");
      console.error(error);
    },
  });

  const modifyCommentMutation = useMutation({
    mutationFn: async (form: CommentForm) => {
      const { data } = await axiosInstance.put(
        "/api/comments/" + form.uid,
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
      const { data } = await axiosInstance.delete("/api/comments/" + uid);
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
