import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { verifyJWT } from "utils/signJWT";
import authOptions from "auth.config";

export async function GET(req: NextRequest) {
  try {
    const accessToken = req.headers.get("authorization");
    if (!accessToken) {
      return NextResponse.json(
        { message: "사용 불가능한 accessToken" },
        { status: 401 },
      );
    }
    const { payload } = await verifyJWT(accessToken.replace("Bearer ", ""));
    if (!payload?.username) {
      return NextResponse.json(
        { message: "The ID is incorrect or incorrect." },
        { status: 403 },
      );
    }
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json(
        { message: "login session expired" },
        { status: 401 },
      );
    }
    return NextResponse.json(session, { status: 200 });
  } catch (error: any) {
    if (error?.code === "ERR_JWT_EXPIRED") {
      return NextResponse.json({ message: "expired" }, { status: 401 });
    }
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
