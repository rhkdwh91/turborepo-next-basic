import { getServerSession } from "next-auth";
import authOptions from "../auth.config";
import { NextResponse } from "next/server";

export async function verifyUser() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json(
      { message: "No user found." },
      {
        status: 401,
        headers: {
          "Set-Cookie": `accessToken=;Path=/;HttpOnly;Max-Age=0;`,
        },
      },
    );
  }
  return session.user?.username;
}
