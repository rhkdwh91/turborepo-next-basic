import { create } from "zustand";
import { User } from "types/user";

interface UserInfoActions {
  setUserInfo: (userinfo: User) => void;
  deleteUserInfo: () => void;
}

interface UserInfoState {
  isLogin: boolean;
  userInfo: User;
}

const useUserInfo = create<UserInfoState & UserInfoActions>((set) => ({
  isLogin: false,
  userInfo: { email: "", username: "" },
  setUserInfo: (userInfo: User) => {
    set({ userInfo, isLogin: true });
  },
  deleteUserInfo: () => {
    set({ userInfo: { email: "", username: "" }, isLogin: false });
  },
}));

export default useUserInfo;
