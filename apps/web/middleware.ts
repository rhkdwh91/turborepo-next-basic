import { NextRequest, NextResponse } from "next/server";
import { verifyJWT } from "utils/signJWT";

const COOKIES = {
  accessToken: "accessToken",
  refreshToken: "refreshToken",
};

export async function middleware(req: NextRequest) {
  const accessToken = req.cookies.get(COOKIES.accessToken);
  if (!accessToken) {
    const clonedUrl = req.nextUrl.clone();
    return NextResponse.redirect(clonedUrl.href);
  }
  const decode = await verifyJWT(accessToken.value);
  if (!decode.payload?.username) {
    const clonedUrl = req.nextUrl.clone();
    return NextResponse.redirect(clonedUrl.href);
  }
  const response = await fetch(
    "http://localhost:3000/api/user/user-check?username=" +
      decode.payload.username,
  );
  const data = await response.json();
  if (!data) {
    const clonedUrl = req.nextUrl.clone();
    return NextResponse.redirect(clonedUrl.href);
  }
}

export const config = {
  matcher: [
    {
      source: "/((?!api|_next/static|_next/image|favicon.ico).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },

    {
      source: "/((?!api|_next/static|_next/image|favicon.ico).*)",
      has: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },

    {
      source: "/((?!api|_next/static|_next/image|favicon.ico).*)",
      has: [{ type: "header", key: "x-present" }],
      missing: [{ type: "header", key: "x-missing", value: "prefetch" }],
    },
    "/post/write",
    "/post/modify",
  ],
};
