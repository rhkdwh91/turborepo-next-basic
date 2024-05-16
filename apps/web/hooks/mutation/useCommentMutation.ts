import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import axiosInstance from "axiosInstance";
import { toast } from "kyz-toast";
import { alertModal } from "@repo/ui/components/organism/AlertModal";
import { CommentForm } from "types/comment";
import { queryKeys } from "queryKeys";

const useCommentMutation = () => {
  const queryClient = useQueryClient();
  const { uid } = useParams();

  const createCommentMutation = useMutation({
    mutationFn: async (form: CommentForm) => {
      const { data } = await axiosInstance.post("/api/comments", form);
      return data;
    },
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: queryKeys.posts.detail(Number(uid)).queryKey,
        type: "active",
      });
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
        "/api/comments/" + form.uid,
        form,
      );
      return data;
    },
    onSuccess: () => {
      toast.success("Successfully modify comment!");
      queryClient.refetchQueries({
        queryKey: queryKeys.posts.detail(Number(uid)).queryKey,
        type: "active",
      });
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
      alertModal.open({ message: "Successfully delete comment!" });
      queryClient.refetchQueries({
        queryKey: queryKeys.posts.detail(Number(uid)).queryKey,
        type: "active",
      });
    },
  });

  return {
    createCommentMutation,
    modifyCommentMutation,
    deleteCommentMutation,
  };
};

export default useCommentMutation;
