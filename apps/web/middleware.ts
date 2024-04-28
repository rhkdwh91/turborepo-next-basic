import { NextRequest, NextResponse } from "next/server";
import { verifyJWT } from "utils/signJWT";

const COOKIES = {
  accessToken: "accessToken",
  refreshToken: "refreshToken",
};

export async function middleware(req: NextRequest) {
  const accessToken = req.cookies.get(COOKIES.accessToken);
  if (!accessToken) {
    const url = req.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }
  const decode = await verifyJWT(accessToken.value);
  if (!decode.payload?.username) {
    const url = req.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }
}

export const config = {
  matcher: ["/post/write", "/post/modify/:path*"],
};
