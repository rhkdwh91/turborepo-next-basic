import { NextRequest, NextResponse } from "next/server";
import authCheck from "@/shared/lib/utils/authCheck";
import { cloneDeep } from "lodash";
import prisma from "@/prisma/client";
import { errorHandler } from "@/shared/lib/utils/apiErrorHandler";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ uid: string }> },
) {
  try {
    await authCheck(req);

    const { uid } = await params;
    const requestData = await req.json();
    const form = cloneDeep(requestData);
    await prisma.tag.update({
      data: form,
      where: {
        uid: Number(uid),
      },
    });
    return NextResponse.json(
      { message: "delete Successfully!" },
      { status: 201 },
    );
  } catch (error) {
    return errorHandler(error);
  }
}
