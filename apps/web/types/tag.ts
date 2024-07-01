export interface Tag {
  uid: number;
  name: string;
  value: string;
}

export interface Category extends Tag {
  tags: Tag[];
}
