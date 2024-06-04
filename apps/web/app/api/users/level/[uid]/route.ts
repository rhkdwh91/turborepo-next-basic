import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import prisma from "@/prisma/client";
import authCheck, { AuthError } from "@/utils/authCheck";
import { errorHandler } from "@/utils/apiErrorHandler";
import { cloneDeep } from "lodash";

export async function PUT(
  req: NextRequest,
  { params }: { params: { uid: string } },
) {
  try {
    const user = await authCheck(req);
    if (user.level !== 0) {
      throw new AuthError(403, "권한이 부족합니다.");
    }
    const requestData = await req.json();
    const form = cloneDeep(requestData);
    await prisma.user.update({
      data: { level: Number(form.level) },
      where: {
        uid: Number(params.uid),
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
