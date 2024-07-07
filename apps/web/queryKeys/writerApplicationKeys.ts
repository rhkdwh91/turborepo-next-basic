import { createQueryKeys } from "@lukemorales/query-key-factory";
import axiosInstance from "axiosInstance";
import { WriterApplication } from "types/writer-application";

const writerApplicationKeys = createQueryKeys("writerApplication", {
  detail: () => ({
    queryKey: ["detail"],
    queryFn: async (): Promise<WriterApplication> => {
      const { data } = await axiosInstance.get(`/api/writer-application`);
      return data;
    },
  }),
});

export default writerApplicationKeys;
