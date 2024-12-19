import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import prisma from "@/prisma/client";
import authCheck, { AuthError } from "@/utils/authCheck";
import { errorHandler } from "@/utils/apiErrorHandler";
import { cloneDeep } from "lodash";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ uid: string }> },
) {
  try {
    const user = await authCheck(req);
    const { uid } = await params;
    if (user?.level && user.level > 1) {
      new AuthError(403, "권한이 부족합니다.");
    }
    const requestData = await req.json();
    const form = cloneDeep(requestData);
    console.log(form);
    await prisma.user.update({
      data: { level: Number(form.level) },
      where: {
        uid: Number(uid),
      },
    });
    return NextResponse.json(
      { message: "level modify Successfully!" },
      { status: 201 },
    );
  } catch (error) {
    return errorHandler(error);
  }
}
