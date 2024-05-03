import { serialize } from "cookie";
import { signJWT } from "utils/signJWT";
import { NextRequest, NextResponse } from "next/server";
import prisma from "prisma/client";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    const requestData = await req.json();
    if (!requestData.username && !requestData.password) {
      return NextResponse.json({ message: "Invalid Value" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: {
        username: requestData.username,
      },
    });
    if (!user) {
      return NextResponse.json(
        { message: "The ID is incorrect or incorrect." },
        { status: 400 },
      );
    }
    const isPasswordCorrect = await bcrypt.compare(
      requestData.password,
      user.password,
    );
    if (!isPasswordCorrect) {
      return NextResponse.json(
        { message: "The ID is incorrect or incorrect." },
        { status: 400 },
      );
    }

    const token = await signJWT({ username: user.username });

    const cookie = serialize("accessToken", token.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // One week
      path: "/",
    });

    return NextResponse.json(
      {
        username: user.username,
        email: user.email,
        level: user.level,
        profileImage: user.profileImage,
      },
      {
        status: 201,
        headers: {
          "Set-Cookie": cookie,
        },
      },
    );
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
