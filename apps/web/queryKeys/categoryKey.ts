import { createQueryKeys } from "@lukemorales/query-key-factory";
import axiosInstance from "axiosInstance";
import { Tag } from "types/tag";

const tagsKeys = createQueryKeys("categories", {
  list: () => ({
    queryKey: ["list"],
    queryFn: async (): Promise<Tag[]> => {
      const { data } = await axiosInstance.get(`/api/categories`);
      return data;
    },
  }),
});

export default tagsKeys;
