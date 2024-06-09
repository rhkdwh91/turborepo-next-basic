import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import prisma from "prisma/client";
import { errorHandler } from "@/utils/apiErrorHandler";

export async function PUT(
  req: NextRequest,
  { params }: { params: { uid: string } },
) {
  try {
    await prisma.postView.upsert({
      where: {
        postUid: Number(params.uid),
      },
      update: {
        count: {
          increment: 1,
        },
      },
      create: {
        postUid: Number(params.uid),
        count: 1,
      },
    });
    return NextResponse.json(
      { message: "increment viewCnt Successfully!" },
      { status: 201 },
    );
  } catch (error) {
    return errorHandler(error);
  }
}
