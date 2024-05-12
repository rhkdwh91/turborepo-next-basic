import { Tag } from "./tag";
import { Comment } from "./comment";
import { User } from "./user";

export interface Post {
  uid: number;
  title: string;
  content: string;
  username: string;
  user?: User;
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
