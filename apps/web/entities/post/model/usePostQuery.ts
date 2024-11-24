import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/queryKeys";
import { PostParams } from "@/types/post";

export const usePostListQuery = (params: PostParams) => {
  return useQuery({ ...queryKeys.posts.list(params) });
};
