import { NextRequest, NextResponse } from "next/server";
import { verifyJWT } from "utils/signJWT";

const COOKIES = {
  accessToken: "accessToken",
  refreshToken: "refreshToken",
};

export async function middleware(req: NextRequest) {
  const accessToken = req.cookies.get(COOKIES.accessToken);
  if (!accessToken) {
    return NextResponse.redirect("/");
  }
  const decode = await verifyJWT(accessToken.value);
  if (!decode.payload?.username) {
    return NextResponse.redirect("/");
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
  matcher: ["/post/write", "/post/modify"],
};
