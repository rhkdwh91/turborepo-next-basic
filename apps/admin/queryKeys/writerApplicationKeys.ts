import { createQueryKeys } from "@lukemorales/query-key-factory";
import axiosInstance from "axiosInstance";
import { WriterApplication } from "types/writer-application";
import { ApplicationUserData } from "types/user";

const writerApplicationKeys = createQueryKeys("writerApplication", {
  list: () => ({
    queryKey: ["list"],
    queryFn: async (): Promise<ApplicationUserData[]> => {
      const { data } = await axiosInstance.get(`/api/writer-application`, {
        params: { take: 5, skip: 0 },
      });
      return data;
    },
  }),
  detailList: (uid: number) => ({
    queryKey: ["detailList", uid],
    queryFn: async (): Promise<WriterApplication[]> => {
      const { data } = await axiosInstance.get(
        `/api/writer-application/${uid}`,
      );
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
