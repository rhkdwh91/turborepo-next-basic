import { NextRequest, NextResponse } from "next/server";
import authCheck from "@/utils/authCheck";
import prisma from "@/prisma/client";
import { errorHandler } from "@/utils/apiErrorHandler";

export async function GET(req: NextRequest) {
  try {
    const user = await authCheck(req);
    const writerApplication = await prisma.writerApplication.findFirst({
      where: {
        userUid: user.uid,
      },
    });
    console.log(writerApplication, user);
    return NextResponse.json(writerApplication, { status: 201 });
  } catch (error) {
    return errorHandler(error);
  }
}
