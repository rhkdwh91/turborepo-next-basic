import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/queryKeys";

export const useAuthorQuery = (name: string) => {
  return useQuery({ ...queryKeys.author.detail(name) });
};
