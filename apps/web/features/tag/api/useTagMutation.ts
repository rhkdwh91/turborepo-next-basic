import axiosInstance from "shared/lib/axiosInstance";
import { useMutation } from "@tanstack/react-query";
import { toast } from "kyz-toast";

export const useTagCreateMutation = () => {
  return useMutation({
    mutationFn: (payload: { value: string; name: string }) =>
      axiosInstance.post("/api/tags", payload),
  });
};

export const useTagDeleteMutation = () => {
  return useMutation({
    mutationFn: (name: string) => axiosInstance.delete(`/api/tags/${name}`),
    onSuccess: () => {
      toast.success("Successfully delete post!");
    },
  });
};

export const useTagUpdateCategoryMutation = () => {
  return useMutation({
    mutationFn: (payload: { categoryUid: number; tagUid: number }) =>
      axiosInstance.put(`/api/tags/${payload.tagUid}/category`, {
        categoryUid: payload.categoryUid,
      }),
  });
};
