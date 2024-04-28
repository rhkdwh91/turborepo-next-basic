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
  try {
    const response = await fetch(
      "http://localhost:3000/api/user/user-check?username=" +
        decode.payload.username,
    );
    const data = await response.json();
    if (!data) {
      const url = req.nextUrl.clone();
      url.pathname = "/";
      return NextResponse.redirect(url);
    }
  } catch (error) {
    console.error(error);
    const url = req.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }
}

export const config = {
  matcher: ["/post/write", "/post/modify"],
};
