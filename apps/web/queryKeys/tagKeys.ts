import { createQueryKeys } from "@lukemorales/query-key-factory";
import axiosInstance from "axiosInstance/axios-client";
import { Tag } from "types/tag";

const tagsKeys = createQueryKeys("tags", {
  list: () => ({
    queryKey: ["list"],
    queryFn: async (): Promise<Tag[]> => {
      const { data } = await axiosInstance.get(`/api/tags`);
      return data;
    },
  }),
});

export default tagsKeys;
