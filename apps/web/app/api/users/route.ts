import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import prisma from "prisma/client";
import authCheck from "@/utils/authCheck";
import { errorHandler } from "@/utils/apiErrorHandler";

export async function GET(req: NextRequest) {
  try {
    await authCheck(req);
    const searchParams = req.nextUrl.searchParams;
    const take = searchParams.get("take");
    const skip = searchParams.get("skip");
    const users = await prisma.user.findMany({
      take: take && !Number.isNaN(Number(take)) ? Number(take) : 100,
      skip: skip && !Number.isNaN(Number(skip)) ? Number(skip) : 0,
      orderBy: {
        uid: "desc",
      },
    });
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    return errorHandler(error);
  }
}
