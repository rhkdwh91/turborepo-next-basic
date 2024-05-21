import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axiosInstance from "axiosInstance";

const authOptions = {
  pages: {
    signIn: "/sign-in",
  },
  providers: [
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
        if (req.body?.refresh === "true") {
        }

        const { data } = await axiosInstance.post(
          `${process.env.NEXTAUTH_URL}/api/auth/sign-in`,
          {
            username: credentials?.username,
            password: credentials?.password,
          },
        );
        return data || null;
      },
    }),
  ],
  callbacks: {
    async jwt(params) {
      if (params.user) {
        params.token.user = params.user;
      }
      return params.token;
    },
    session: async function (params) {
      params.session.user = params.token.user as any;
      return params.session;
    },
  },
} satisfies AuthOptions;

export default authOptions;
