import { User } from "next-auth";

export const ApplicationType = {
  RECEIPT: "RECEIPT",
  ACCEPTING: "ACCEPTING",
  ACCEPT: "ACCEPT",
  REJECT: "REJECT",
} as const;

export type ApplicationType =
  (typeof ApplicationType)[keyof typeof ApplicationType];

export interface WriterApplication {
  uid: number;
  userUid: number;
  user: User;
  status: ApplicationType;
  content: Record<string, any>;
  createAt: string;
  updateAt: string;
}
