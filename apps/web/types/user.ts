import { Post } from "./post";
import { Comment } from "./comment";

export interface User {
  uid: number;
  email: string;
  profileImage: string;
  username: string;
  level: number;
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
