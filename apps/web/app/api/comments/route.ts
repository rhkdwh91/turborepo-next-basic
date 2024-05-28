import { NextRequest, NextResponse } from "next/server";
import { cloneDeep } from "lodash";
import prisma from "prisma/client";
import authCheck from "@/utils/authCheck";

export async function POST(req: NextRequest) {
  try {
    const user = await authCheck(req);
    const requestData = await req.json();
    const form = cloneDeep(requestData);
    form.userUid = user.uid;
    await prisma.comment.create({ data: form });
    return NextResponse.json({ message: "ok" }, { status: 201 });
  } catch (error: any) {
    console.error(error);
    if (error?.code === "ERR_JWT_EXPIRED") {
      return NextResponse.json({ message: "expired" }, { status: 401 });
    }
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
