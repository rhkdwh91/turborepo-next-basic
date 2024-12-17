import axiosInstance from "shared/lib/axiosInstance";
import { useMutation } from "@tanstack/react-query";
import { toast } from "kyz-toast";

export const useCategoryCreateMutation = () => {
  return useMutation({
    mutationFn: (payload: { value: string; name: string }) =>
      axiosInstance.post("/api/categories", payload),
  });
};

export const useCategoryDeleteMutation = () => {
  return useMutation({
    mutationFn: (name: string) =>
      axiosInstance.delete(`/api/categories/${name}`),
    onSuccess: () => {
      toast.success("Successfully delete post!");
    },
  });
};
