import { createQueryKeys } from "@lukemorales/query-key-factory";
import axiosInstance from "@/shared/lib/axiosInstance";
import { User } from "next-auth";

const authorKeys = createQueryKeys("author", {
  detail: (username: string) => ({
    queryKey: ["detail"],
    queryFn: async (): Promise<User> => {
      const { data } = await axiosInstance.get<User>(`/api/author/${username}`);
      return data;
    },
  }),
});

export default authorKeys;
