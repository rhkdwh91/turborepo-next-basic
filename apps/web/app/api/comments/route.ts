import { NextRequest, NextResponse } from "next/server";
import { cloneDeep } from "lodash";
import prisma from "prisma/client";
import { getServerSession } from "next-auth";
import { verifyJWT } from "utils/signJWT";
import authOptions from "auth.config";

export async function POST(req: NextRequest) {
  try {
    const accessToken = req.headers.get("authorization");
    if (!accessToken) {
      return NextResponse.json(
        { message: "사용 불가능한 accessToken" },
        { status: 401 },
      );
    }
    const { payload } = await verifyJWT(accessToken.replace("Bearer ", ""));
    if (!payload?.username) {
      return NextResponse.json(
        { message: "The ID is incorrect or incorrect." },
        { status: 403 },
      );
    }
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json(
        { message: "login session expired" },
        { status: 401 },
      );
    }
    const requestData = await req.json();
    const form = cloneDeep(requestData);
    form.userUid = session.user.uid;
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
