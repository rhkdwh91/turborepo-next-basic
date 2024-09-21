import { signJWT } from "utils/signJWT";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDb } from "@/db";
import { FieldPacket } from "mysql2/promise";

export async function POST(req: NextRequest) {
  try {
    const requestData = await req.json();
    console.log("HIHI");
    if (!requestData.username && !requestData.password) {
      return NextResponse.json({ message: "Invalid Value" }, { status: 400 });
    }

    const connection = await connectDb();
    const [rows]: [any, FieldPacket[]] = (await connection.execute(
      "SELECT * FROM User WHERE username = ?",
      [requestData.username],
    )) as [any, FieldPacket[]];

    if (!rows[0]?.password) {
      return NextResponse.json(
        { message: "The ID is incorrect or incorrect." },
        { status: 400 },
      );
    }
    const isPasswordCorrect = await bcrypt.compare(
      requestData.password,
      rows[0]?.password,
    );
    if (!isPasswordCorrect) {
      return NextResponse.json(
        { message: "The ID is incorrect or incorrect." },
        { status: 400 },
      );
    }

    const token = await signJWT({
      uid: rows[0]?.uid,
      username: rows[0]?.username,
      email: rows[0]?.email,
      profileImage: rows[0]?.profileImage,
      level: rows[0]?.level,
    });

    return NextResponse.json(
      {
        uid: rows[0]?.uid,
        username: rows[0]?.username,
        email: rows[0]?.email,
        level: rows[0]?.level,
        profileImage: rows[0]?.profileImage,
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
