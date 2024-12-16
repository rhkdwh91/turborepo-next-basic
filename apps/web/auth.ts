import NextAuth from "next-auth";
import authOptions from "./auth.config"; // 기존 authOptions import

export const { auth, signIn, signOut } = NextAuth(authOptions);
