import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import authCheck from "@/utils/authCheck";
import { errorHandler } from "@/utils/apiErrorHandler";

export async function GET(
  req: NextRequest,
  { params }: { params: { uid: string } },
) {
  try {
    const user = await authCheck(req);
    const searchParams = req.nextUrl.searchParams;
    const take = searchParams.get("take");
    const skip = searchParams.get("skip");
    const userUid = Number(params.uid);

    const where: any = {};

    if (userUid) {
      where.userUid = userUid;
    }

    const writerApplicationUsers = await prisma.writerApplication.findMany({
      take: take && !Number.isNaN(Number(take)) ? Number(take) : 20,
      skip: skip && !Number.isNaN(Number(skip)) ? Number(skip) : 0,
      where: where,
      include: {
        user: true,
      },
    });
    console.log(writerApplicationUsers, user);
    return NextResponse.json(writerApplicationUsers, { status: 201 });
  } catch (error) {
    return errorHandler(error);
  }
}
