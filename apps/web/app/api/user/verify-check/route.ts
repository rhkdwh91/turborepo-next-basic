import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import authCheck from "utils/authCheck";

export async function GET(req: NextRequest) {
  const user = await authCheck(req);
  if (!user) {
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
  return NextResponse.json(
    {
      username: user.username,
      email: user.email,
      level: user.level,
      profileImage: user.profileImage,
    },
    {
      status: 200,
    },
  );
}
