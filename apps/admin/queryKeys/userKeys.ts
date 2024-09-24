import { createQueryKeys } from "@lukemorales/query-key-factory";
import axiosInstance from "@/axiosInstance";
import qs from "qs";
import { User } from "next-auth";

const userKeys = createQueryKeys("user", {
  list: () => ({
    queryKey: ["list"],
    queryFn: async (): Promise<User[]> => {
      const { data } = await axiosInstance.get<User[]>("/api/users", {
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
