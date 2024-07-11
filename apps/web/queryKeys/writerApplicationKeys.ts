import { createQueryKeys } from "@lukemorales/query-key-factory";
import axiosInstance from "axiosInstance";
import { WriterApplication } from "types/writer-application";

const writerApplicationKeys = createQueryKeys("writerApplication", {
  list: () => ({
    queryKey: ["list"],
    queryFn: async (): Promise<WriterApplication[]> => {
      const { data } = await axiosInstance.get(`/api/writer-application`);
      return data;
    },
  }),
  detail: () => ({
    queryKey: ["detail"],
    queryFn: async (): Promise<WriterApplication> => {
      const { data } = await axiosInstance.get(
        `/api/writer-application/latest`,
      );
      return data;
    },
  }),
});

export default writerApplicationKeys;
