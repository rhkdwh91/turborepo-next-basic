import NextAuth, { NextAuthConfig } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

const config = {
  pages: {
    signIn: "/sign-in",
    error: "/sign-in",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      authorization:
        "https://accounts.google.com/o/oauth2/v2/auth?prompt=consent&access_type=offline&response_type=code",
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "Please enter a username",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Please enter a password",
        },
      },
      async authorize(credentials, req) {
        if ((req.body as any)?.refresh === "true") {
          const refreshToken = (req.body as any).refreshToken;
          const res = await fetch(
            `${process.env.NEXTAUTH_URL}/api/auth/refresh-token`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                authorization: refreshToken,
              },
            },
          );
          const result = await res.json();
          if (result?.username) {
            return result;
          }
          return null;
        }

        const res = await fetch(
          `${process.env.NEXTAUTH_URL}/api/auth/sign-in`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: credentials?.username,
              password: credentials?.password,
            }),
          },
        );
        const result = await res.json();
        if (result?.username) {
          return result;
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async signIn({ account, profile, user }) {
      if (!user) {
        return false;
      }
      if (account?.provider === "google") {
        const res = await fetch(
          `${process.env.NEXTAUTH_URL}/api/auth/sign-in/oauth-token`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              provider: "google",
              accountId: profile?.email,
            }),
          },
        );
        const result = await res.json();
        if (!result?.username) {
          return false;
        }
        user.uid = result.uid;
        user.username = result.username;
        user.email = result.email;
        user.profileImage = result.profileImage;
        user.level = result.level;
        user.accessToken = result.accessToken;
        user.refreshToken = result.refreshToken;
        return true;
      }
      return true;
    },
    async jwt(params) {
      if (params.user) {
        params.token.user = params.user;
      }
      return params.token;
    },
    async session(params) {
      params.session.user = params.token.user as any;
      return params.session;
    },
  },
} as NextAuthConfig;

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth(config);

export default config;
