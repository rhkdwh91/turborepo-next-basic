import { NextResponse } from "next/server";
import { Session } from "next-auth";

export async function verifyUser(session: Session | null) {
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
  return null;
}
