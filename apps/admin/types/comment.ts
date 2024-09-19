import { User } from "./user";

export interface Comment {
  uid: number;
  postUid: number;
  content: string;
  user: User;
  createAt: string;
  updateAt: string;
}

export interface CommentForm {
  uid?: number;
  postUid: number;
  content: string;
  userUid?: number;
}
