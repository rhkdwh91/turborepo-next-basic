import { signJWT, verifyRefreshToken } from "utils/signJWT";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import authConfig from "auth.config";

export async function POST(req: NextRequest) {
  try {
    const refreshToken = req.headers.get("authorization");
    if (!refreshToken) {
      return NextResponse.json(
        { message: "사용 불가능한 토큰" },
        { status: 403 },
      );
    }
    const { payload } = await verifyRefreshToken(
      refreshToken.replace("Bearer ", ""),
    );
    if (!payload?.user) {
      return NextResponse.json(
        { message: "The ID is incorrect or incorrect." },
        { status: 400 },
      );
    }
    const session = await getServerSession(authConfig);
    if (!session?.user) {
      return NextResponse.json(
        { message: "login session expired" },
        { status: 403 },
      );
    }
    const { user } = session;
    const { username } = payload;

    const token = await signJWT({ username });

    return NextResponse.json(
      {
        uid: user.uid,
        username: user.username,
        email: user.email,
        level: user.level,
        profileImage: user.profileImage,
        refreshToken: user.refreshToken,
        accessToken: token.accessToken,
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
