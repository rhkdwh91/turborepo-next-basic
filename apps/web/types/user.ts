export interface User {
  email?: string;
  profileImage?: string;
  username: string;
  level?: number;
}

export interface UserForm {
  email?: string;
  profileImage?: string;
  username: string;
  password: string;
}
