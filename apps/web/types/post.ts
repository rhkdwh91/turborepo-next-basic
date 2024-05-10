import { Tag } from "./tag";
import { Comment } from "./comment";

export interface Post {
  uid: number;
  title: string;
  content: string;
  username: string;
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
  username: string;
}
