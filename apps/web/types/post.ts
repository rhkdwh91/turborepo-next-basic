import { Tag } from "./tag";

export interface Post {
  uid: number;
  title: string;
  content: string;
  username: string;
  tags: Tag[];
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
