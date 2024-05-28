import { NextRequest, NextResponse } from "next/server";
import prisma from "prisma/client";
import { errorHandler } from "utils/apiErrorHandler";
import authCheck from "@/utils/authCheck";

export async function GET(req: NextRequest) {
  try {
    const { username } = await authCheck(req);

    const user = await prisma.user.findFirst({
      where: {
        username: username,
      },
    });
    if (!user) {
      return NextResponse.json({ message: "not user" }, { status: 403 });
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error: any) {
    return errorHandler(error);
  }
}
