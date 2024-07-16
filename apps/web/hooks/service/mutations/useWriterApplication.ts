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

export const useAcceptingWriterApplication = () => {
  return useMutation({
    mutationFn: async (payload: { content: string }) => {
      const { data } = await axiosInstance.post("/api/writer-application", {
        ...payload,
        status: "ACCEPTING",
      });

      return data;
    },
    onSuccess: () => {
      toast.success("Successfully registered user!");
    },
  });
};

export const useAcceptWriterApplication = () => {
  return useMutation({
    mutationFn: async (payload: { content: string }) => {
      const { data } = await axiosInstance.post("/api/writer-application", {
        ...payload,
        status: "ACCEPT",
      });

      return data;
    },
    onSuccess: () => {
      toast.success("Successfully registered user!");
    },
  });
};

export const useRejectWriterApplication = () => {
  return useMutation({
    mutationFn: async (payload: { content: string }) => {
      const { data } = await axiosInstance.post("/api/writer-application", {
        ...payload,
        status: "REJECT",
      });

      return data;
    },
    onSuccess: () => {
      toast.success("Successfully registered user!");
    },
  });
};
