import { AuthOptions, getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const postRefreshToken: any = async () => {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return null;
  }

  const res = await fetch(
    `${process.env.NEXTAUTH_URL}/api/auth/refresh-token`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: session.user.refreshToken,
      },
    },
  );
  const result = await res.json();
  if (result?.username) {
    return result;
  }
  return null;
};

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
          return await postRefreshToken();
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
