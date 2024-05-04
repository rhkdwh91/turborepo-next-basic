export interface Post {
  uid: number;
  title: string;
  content: string;
  username: string;
  tags: string;
  createAt: string;
  updateAt: string;
}

export interface PostForm {
  uid?: number;
  title: string;
  content: string;
  tags: string;
  username: string;
}
