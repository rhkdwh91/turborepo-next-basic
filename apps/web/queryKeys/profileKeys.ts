import { createQueryKeys } from "@lukemorales/query-key-factory";
import axiosInstance from "axiosInstance";
import { Session } from "next-auth";

const profileKeys = createQueryKeys("profile", {
  detail: () => ({
    queryKey: ["detail"],
    queryFn: async (): Promise<Session> => {
      const { data } = await axiosInstance.get(`/api/auth/profile`);
      return data;
    },
  }),
});

export default profileKeys;
