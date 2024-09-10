import { Post } from "./post";
import { Comment } from "./comment";

export interface UserToken {
  uid: number;
  email: string | null;
  profileImage: string | null;
  username: string;
  level: number | null;
}

export interface User extends UserToken {
  accessToken: string;
  refreshToken: string;
  comments?: Comment[];
  posts?: Post[];
}

export interface UserForm {
  email?: string;
  profileImage?: string;
  username: string;
  password: string;
}

export interface ApplicationUserData {
  createAt: string;
  uid: number;
  updateAt: string;
  user: UserToken;
  userUid: number;
}
