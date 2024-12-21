import { signJWT, verifyRefreshToken } from "@/shared/lib/utils/signJWT";
import { NextRequest, NextResponse } from "next/server";
import prisma from "prisma/client";
import { errorHandler } from "@/shared/lib/utils/apiErrorHandler";

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
    console.log(user, "SERVER");
    if (!user) {
      return NextResponse.json({ message: "not user" }, { status: 403 });
    }

    const token = await signJWT({
      uid: user.uid,
      username: user.username,
      email: user.email,
      profileImage: user.profileImage,
      level: user.level,
    });

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
  } catch (error: any) {
    if (error?.code === "ERR_JWT_EXPIRED") {
      return NextResponse.json(
        { message: "expired refresh token" },
        { status: 403 },
      );
    }
    return errorHandler(error);
  }
}
