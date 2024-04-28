import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyJWT } from "utils/signJWT";
import prisma from "prisma/client";

const COOKIES = {
  accessToken: "accessToken",
  refreshToken: "refreshToken",
};

export async function GET(req: NextRequest) {
  const accessToken = req.cookies.get(COOKIES.accessToken);
  if (!accessToken) {
    return NextResponse.json(
      { message: "No username found." },
      { status: 401 },
    );
  }
  const decode = await verifyJWT(accessToken.value);
  if (!decode.payload?.username) {
    return NextResponse.json(
      { message: "No username found." },
      {
        status: 401,
        headers: {
          "Set-Cookie": `accessToken=;Path=/;HttpOnly;Max-Age=0;`,
        },
      },
    );
  }
  const user = await prisma.user.findUnique({
    where: {
      username: String(decode.payload?.username),
    },
  });

  if (!user) {
    return NextResponse.json(
      { message: "No username found." },
      {
        status: 401,
        headers: {
          "Set-Cookie": `accessToken=;Path=/;HttpOnly;Max-Age=0;`,
        },
      },
    );
  }
  return NextResponse.json(
    { username: user.username, email: user.email },
    {
      status: 200,
    },
  );
}
