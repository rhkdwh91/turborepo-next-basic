export interface Post {
  uid: number;
  title: string;
  content: string;
  username: string;
  tag: string;
  createAt: string;
  updateAt: string;
}

export interface PostForm {
  uid?: number;
  title: string;
  content: string;
  tag: string;
}
