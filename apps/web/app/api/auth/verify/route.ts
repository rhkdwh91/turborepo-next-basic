import { NextRequest, NextResponse } from "next/server";
import { verifyJWT } from "@/shared/lib/utils/signJWT";
import { auth } from "@/auth.config";

export async function GET(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.accessToken) {
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
    const result = await verifyJWT(session.user.accessToken);
    return NextResponse.json({ message: result }, { status: 500 });
  } catch (error: any) {
    if (error?.code === "ERR_JWT_EXPIRED") {
      const response = NextResponse.redirect(new URL("/", req.url));
      response.cookies.set("next-auth.callback-url", "", { maxAge: 0 });
      response.cookies.set("next-auth.csrf-token", "", { maxAge: 0 });
      response.cookies.set("next-auth.session-token", "", { maxAge: 0 });
      return response;
    }
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
