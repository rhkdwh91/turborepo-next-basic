import { Tag } from "./tag";
import { Comment } from "./comment";
import { User } from "./user";

export interface PostParams {
  tags?: Tag[];
  username?: string;
  skip: number;
  take: number;
}

export interface Post {
  uid: number;
  title: string;
  content: string;
  username: string;
  user?: User;
  postView?: { count: number };
  userUid?: number;
  tags: Tag[];
  comments: Comment[];
  createAt: string;
  updateAt: string;
}

export interface PostForm {
  uid?: number;
  title: string;
  content: string;
  tags: Tag[];
}
