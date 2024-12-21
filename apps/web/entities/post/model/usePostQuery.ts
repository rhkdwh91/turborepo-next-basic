import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "shared/lib/queryKeys";
import { PostParams } from "@/types/post";

export const usePostListQuery = (params: PostParams) => {
  return useQuery({ ...queryKeys.posts.list(params) });
};
