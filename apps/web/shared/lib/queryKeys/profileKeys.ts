import { createQueryKeys } from "@lukemorales/query-key-factory";
import axiosInstance from "@/shared/lib/axiosInstance";
import { User } from "@/types/user";

const profileKeys = createQueryKeys("profile", {
  detail: () => ({
    queryKey: ["detail"],
    queryFn: async (): Promise<User> => {
      const { data } = await axiosInstance.get(`/api/auth/profile`);
      console.log(
        data,
        typeof window === "undefined"
          ? "SERVER----PROFILE QUERY KEYS"
          : "CLIENT----PROFILE QUERY KEYS",
      );
      return data;
    },
  }),
});

export default profileKeys;
