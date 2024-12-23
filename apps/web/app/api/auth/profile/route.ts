import { NextRequest, NextResponse } from "next/server";
import prisma from "@/shared/lib/prisma/client";
import { errorHandler } from "@/shared/lib/utils/apiErrorHandler";
import authCheck from "@/shared/lib/utils/authCheck";

export async function GET(req: NextRequest) {
  try {
    console.log(req, "________________PROFILE");
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
