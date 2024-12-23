import { signJWT } from "@/shared/lib/utils/signJWT";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function POST(req: NextRequest) {
  try {
    const requestData = await req.json();
    if (!requestData.provider || !requestData.accountId) {
      return NextResponse.json({ message: "Invalid Value" }, { status: 400 });
    }

    let user;

    user = await prisma.user.findUnique({
      include: {
        oauthToken: true,
      },
      where: {
        email: requestData.accountId,
      },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          username: requestData.accountId,
          email: requestData.accountId,
          level: 3,
        },
      });
    }

    if (!(user as any)?.oauthToken) {
      await prisma.oauthToken.create({
        data: {
          userUid: user.uid,
          provider: requestData.provider,
          id: requestData.accountId,
        },
      });
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
        accessToken: token.accessToken,
        refreshToken: token.refreshToken,
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
