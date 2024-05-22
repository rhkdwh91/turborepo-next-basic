import { signJWT, verifyRefreshToken } from "utils/signJWT";
import { NextRequest, NextResponse } from "next/server";
import prisma from "prisma/client";

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
    if (!payload?.username) {
      return NextResponse.json(
        { message: "The ID is incorrect or incorrect." },
        { status: 400 },
      );
    }
    const { username } = payload;
    const user = await prisma.user.findFirst({
      where: {
        username: username,
      },
    });
    if (!user) {
      return NextResponse.json({ message: "not user" }, { status: 403 });
    }

    const token = await signJWT({ username: user.username });

    return NextResponse.json(
      {
        uid: user.uid,
        username: user.username,
        email: user.email,
        level: user.level,
        profileImage: user.profileImage,
        refreshToken: refreshToken.replace("Bearer ", ""),
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
