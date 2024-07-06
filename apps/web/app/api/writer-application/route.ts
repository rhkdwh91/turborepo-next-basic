import { NextRequest, NextResponse } from "next/server";
import authCheck from "@/utils/authCheck";
import { cloneDeep } from "lodash";
import prisma from "@/prisma/client";
import { errorHandler } from "@/utils/apiErrorHandler";

export async function GET(req: NextRequest) {
  try {
    const user = await authCheck(req);
    await prisma.writerApplication.findUnique({
      where: {
        userUid: user.uid,
      },
    });
    return NextResponse.json({ message: "ok" }, { status: 201 });
  } catch (error) {
    return errorHandler(error);
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await authCheck(req);
    const requestData = await req.json();
    const form = cloneDeep(requestData);
    form.userUid = user.uid;
    await prisma.writerApplication.create({ data: form });
    return NextResponse.json({ message: "ok" }, { status: 201 });
  } catch (error) {
    return errorHandler(error);
  }
}
