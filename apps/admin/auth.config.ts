import { AuthOptions, getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

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
    session: async function (params) {
      params.session.user = params.token.user as any;
      return params.session;
    },
  },
} satisfies AuthOptions;

export default authOptions;
