import { NextRequest, NextResponse } from "next/server";
import { cloneDeep } from "lodash";
import prisma from "@/shared/lib/prisma/client";
import authCheck from "@/shared/lib/utils/authCheck";
import { errorHandler } from "@/shared/lib/utils/apiErrorHandler";

export async function POST(req: NextRequest) {
  try {
    const user = await authCheck(req);
    const requestData = await req.json();
    const form = cloneDeep(requestData);
    form.userUid = user.uid;
    await prisma.comment.create({ data: form });
    return NextResponse.json({ message: "ok" }, { status: 201 });
  } catch (error: any) {
    return errorHandler(error);
  }
}
