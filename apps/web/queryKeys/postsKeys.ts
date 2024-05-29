import { createQueryKeys } from "@lukemorales/query-key-factory";
import axiosInstance from "axiosInstance";
import { Post } from "types/post";
import qs from "qs";

export const infinityPostskeys = createQueryKeys("infinityPosts", {
  list: (params: { tag: string[] }) => ({
    queryKey: ["list", params],
    queryFn: async ({ pageParam = 0 }: { pageParam: number }) => {
      console.log(pageParam, "PAGE PARAM");
      const { data } = await axiosInstance.get<Post[]>("/api/posts", {
        params: {
          ...params,
          skip: pageParam * 20,
          take: 20,
        },
        paramsSerializer: (params) => {
          return qs.stringify(params, { arrayFormat: "repeat" });
        },
      });
      return data;
    },
  }),
});

const postsKeys = createQueryKeys("posts", {
  detail: (uid: number) => ({
    queryKey: [uid],
    queryFn: async (): Promise<Post> => {
      const { data } = await axiosInstance.get(`/api/posts/${uid}`);
      return data;
    },
  }),
});

export default postsKeys;
