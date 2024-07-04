import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/axiosInstance";
import { toast } from "kyz-toast";

export const useReceiptWriterApplication = () => {
  return useMutation({
    mutationFn: async (payload: { content: string }) => {
      const { data } = await axiosInstance.post("/api/writer-application", {
        ...payload,
        status: "RECEIPT",
      });

      return data;
    },
    onSuccess: () => {
      toast.success("Successfully registered user!");
    },
  });
};
