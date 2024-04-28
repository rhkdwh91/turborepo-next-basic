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
  const response = await fetch(
    process.env.NODE_ENV === "production"
      ? "https://turborepo-next-basic-alpha-sooty.vercel.app/"
      : "http://localhost:3000" +
          "/api/user/user-check?username=" +
          decode.payload.username,
    {
      headers: {
        Accept: "application / json",
      },
      method: "GET",
    },
  );
  const data = await response.json();
  if (!data) {
    const url = req.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }
}

export const config = {
  matcher: ["/post/write", "/post/modify"],
};
