import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    { message: "sign out successfully!" },
    {
      status: 201,
      headers: {
        "Set-Cookie": `accessToken=;Path=/;HttpOnly;Max-Age=0;`,
      },
    },
  );
}
