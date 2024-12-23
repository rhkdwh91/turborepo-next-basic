import { NextRequest, NextResponse } from "next/server";
import authCheck from "@/shared/lib/utils/authCheck";
import prisma from "@/shared/lib/prisma/client";
import { errorHandler } from "@/shared/lib/utils/apiErrorHandler";

export async function GET(req: NextRequest) {
  try {
    const user = await authCheck(req);
    const writerApplication = await prisma.writerApplication.findFirst({
      where: {
        userUid: user.uid,
      },
      orderBy: {
        uid: "desc",
      },
    });
    console.log(writerApplication, user);
    return NextResponse.json(writerApplication, { status: 201 });
  } catch (error) {
    return errorHandler(error);
  }
}
