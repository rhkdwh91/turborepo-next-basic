import { NextRequest, NextResponse } from "next/server";
import { cloneDeep } from "lodash";
import prisma from "prisma/client";
import { verifyUser } from "utils/verifyUser";
import { getServerSession } from "next-auth";
import authOptions from "auth.config";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const userVerification = await verifyUser(session);
    if (userVerification) return userVerification;
    const requestData = await req.json();
    const form = cloneDeep(requestData);
    form.userUid = session!.user!.uid;
    await prisma.comment.create({ data: form });
    return NextResponse.json({ message: "ok" }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
