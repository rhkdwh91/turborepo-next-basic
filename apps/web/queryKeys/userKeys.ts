import { createQueryKeys } from "@lukemorales/query-key-factory";
import { Post } from "@/types/post";
import axiosInstance from "@/axiosInstance";
import qs from "qs";

const userKeys = createQueryKeys("user", {
  list: () => ({
    queryKey: ["list"],
    queryFn: async (): Promise<Post[]> => {
      const { data } = await axiosInstance.get<Post[]>("/api/posts", {
        params: {
          skip: 0,
          take: 100,
        },
        paramsSerializer: (params) => {
          return qs.stringify(params, { arrayFormat: "repeat" });
        },
      });
      return data;
    },
  }),
});

export default userKeys;
