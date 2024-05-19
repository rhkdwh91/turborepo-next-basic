import { createQueryKeys } from "@lukemorales/query-key-factory";
import axiosInstance from "axiosInstance/axios-client";
import { Post } from "types/post";
import qs from "qs";

const postsKeys = createQueryKeys("posts", {
  detail: (uid: number) => ({
    queryKey: [uid],
    queryFn: async (): Promise<Post> => {
      const { data } = await axiosInstance.get(`/api/posts/${uid}`);
      return data;
    },
  }),
  list: (params: { tag: string[] }) => ({
    queryKey: ["list", params],
    queryFn: async (): Promise<Post[]> => {
      const { data } = await axiosInstance.get("/api/posts", {
        params,
        paramsSerializer: (params) => {
          return qs.stringify(params, { arrayFormat: "repeat" });
        },
      });
      return data;
    },
  }),
});

export default postsKeys;
