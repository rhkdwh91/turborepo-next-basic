import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import prisma from "prisma/client";
import { errorHandler } from "@/utils/apiErrorHandler";

export async function PUT(
  req: NextRequest,
  { params }: { params: { uid: string } },
) {
  try {
    await prisma.post.update({
      data: {
        viewCnt: {
          increment: 1,
        },
      },
      where: {
        uid: Number(params.uid),
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
