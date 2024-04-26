export interface Post {
  uid: number;
  title: string;
  content: string;
  userName: string;
  tag: string;
  createAt: string;
  updateAt: string;
}

export interface PostForm {
  title: string;
  content: string;
  userName: string;
  tag: string;
}
