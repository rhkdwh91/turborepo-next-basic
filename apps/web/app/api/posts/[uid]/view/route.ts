import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import prisma from "prisma/client";
import { errorHandler } from "@/utils/apiErrorHandler";

export async function PUT(
  _: NextRequest,
  { params }: { params: Promise<{ uid: string }> },
) {
  try {
    const { uid } = await params;
    await prisma.postView.upsert({
      where: {
        postUid: Number(uid),
      },
      update: {
        count: {
          increment: 1,
        },
      },
      create: {
        postUid: Number(uid),
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
