import { createQueryKeys } from "@lukemorales/query-key-factory";
import axiosInstance from "axiosInstance";
import { Post } from "types/post";

const postsKeys = createQueryKeys("posts", {
  detail: (uid: number) => ({
    queryKey: [uid],
    queryFn: async (): Promise<Post> => {
      const { data } = await axiosInstance.get(`/api/posts/${uid}`);
      return data;
    },
  }),
  list: () => ({
    queryKey: ["list"],
    queryFn: async (): Promise<Post[]> => {
      const { data } = await axiosInstance.get("/api/posts");
      return data;
    },
  }),
});

export default postsKeys;
