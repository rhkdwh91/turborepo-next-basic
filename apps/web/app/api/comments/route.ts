import { NextRequest, NextResponse } from "next/server";
import { cloneDeep } from "lodash";
import prisma from "prisma/client";
import { verifyUser } from "utils/verifyUser";

export async function POST(req: NextRequest) {
  try {
    const userVerification = await verifyUser();
    if (typeof userVerification !== "string") return userVerification;
    const requestData = await req.json();
    const form = cloneDeep(requestData);
    form.username = userVerification;
    await prisma.comment.create({ data: form });
    return NextResponse.json({ message: "ok" }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
