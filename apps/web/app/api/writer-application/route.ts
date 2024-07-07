import { NextRequest, NextResponse } from "next/server";
import authCheck from "@/utils/authCheck";
import { cloneDeep } from "lodash";
import prisma from "@/prisma/client";
import { errorHandler } from "@/utils/apiErrorHandler";

export async function GET(req: NextRequest) {
  try {
    const user = await authCheck(req);
    const writerApplication = await prisma.writerApplication.findUnique({
      where: {
        userUid: user.uid,
      },
    });
    console.log(writerApplication, user);
    return NextResponse.json(writerApplication, { status: 201 });
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
    const writerApplication = await prisma.writerApplication.findUnique({
      where: {
        userUid: user.uid,
      },
    });
    if (writerApplication) {
      return NextResponse.json(
        { message: "이미 있는 application form" },
        { status: 409 },
      );
    }
    await prisma.writerApplication.create({ data: form });
    return NextResponse.json({ message: "ok" }, { status: 201 });
  } catch (error) {
    return errorHandler(error);
  }
}
