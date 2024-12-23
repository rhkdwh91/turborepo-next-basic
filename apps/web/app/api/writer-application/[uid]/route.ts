import { NextRequest, NextResponse } from "next/server";
import prisma from "@/shared/lib/prisma/client";
import authCheck from "@/shared/lib/utils/authCheck";
import { errorHandler } from "@/shared/lib/utils/apiErrorHandler";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ uid: string }> },
) {
  try {
    const user = await authCheck(req);
    const searchParams = req.nextUrl.searchParams;
    const take = searchParams.get("take");
    const skip = searchParams.get("skip");
    const { uid } = await params;
    const userUid = Number(uid);

    const where: any = {};

    if (userUid) {
      where.userUid = userUid;
    }

    const writerApplicationUsers = await prisma.writerApplication.findMany({
      take: take && !Number.isNaN(Number(take)) ? Number(take) : 20,
      skip: skip && !Number.isNaN(Number(skip)) ? Number(skip) : 0,
      where: where,
      include: {
        user: {
          select: {
            uid: true,
            username: true,
            email: true,
            level: true,
            profileImage: true,
            createAt: true,
            updateAt: true,
          },
        },
      },
    });
    console.log(writerApplicationUsers, user);
    return NextResponse.json(writerApplicationUsers, { status: 201 });
  } catch (error) {
    return errorHandler(error);
  }
}
