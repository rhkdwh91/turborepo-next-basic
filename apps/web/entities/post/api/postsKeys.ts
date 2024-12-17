import { createQueryKeys } from "@lukemorales/query-key-factory";
import axiosInstance from "shared/lib/axiosInstance";
import { Post, PostParams } from "@/types/post";
import qs from "qs";

export const infinityPostskeys = createQueryKeys("infinityPosts", {
  list: (params: { tag: string[] }) => ({
    queryKey: ["list", params],
    queryFn: async ({
      pageParam = 0,
    }: {
      pageParam: number;
    }): Promise<Post[]> => {
      const { data } = await axiosInstance.get<Post[]>("/api/posts", {
        params: {
          ...params,
          skip: pageParam * 8,
          take: 8,
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
  list: (params: PostParams) => ({
    queryKey: ["list", params],
    queryFn: async (): Promise<Post[]> => {
      const { data } = await axiosInstance.get<Post[]>("/api/posts", {
        params: {
          ...params,
          skip: params.skip * (params.take ?? 8),
          take: params.take ?? 8,
        },
        paramsSerializer: (params) => {
          return qs.stringify(params, { arrayFormat: "repeat" });
        },
      });
      return data;
    },
  }),
});

export default postsKeys;
