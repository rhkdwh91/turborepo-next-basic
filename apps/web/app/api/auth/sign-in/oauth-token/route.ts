import { signJWT } from "utils/signJWT";
import { NextRequest, NextResponse } from "next/server";
import { OauthToken } from "@prisma/client";
import prisma from "prisma/client";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    const requestData = await req.json();
    if (!requestData.provider || !requestData.accountId) {
      return NextResponse.json({ message: "Invalid Value" }, { status: 400 });
    }

    const dynamicKey = requestData.provider as keyof OauthToken;

    const oauthData = await prisma.oauthToken.findFirst({
      where: {
        [dynamicKey]: requestData.accountId,
      },
    });

    if (!oauthData) {
      return NextResponse.json({ message: "Not user" }, { status: 404 });
    }

    const user = await prisma.user.findFirst({
      where: {
        email: oauthData[dynamicKey] as string,
      },
    });

    if (!user) {
      return NextResponse.json({ message: "Not user" }, { status: 404 });
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
