import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/shared/lib/prisma/client";
import { UserForm } from "types/user";

export async function POST(req: NextRequest) {
  try {
    const requestData = await req.json();

    if (requestData.username && requestData.password) {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(requestData.password, salt);
      const newUser: UserForm = {
        username: requestData.username,
        password: hash,
      };
      if (requestData.email) {
        newUser.email = requestData.email;
      }
      await prisma.user.create({
        data: { ...newUser, level: 3 },
      });
      return NextResponse.json({ message: "success" }, { status: 201 });
    }

    return NextResponse.json({ message: "invalid Value" }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
