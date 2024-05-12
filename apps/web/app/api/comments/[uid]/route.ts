import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import prisma from "prisma/client";
import { cloneDeep } from "lodash";
import { verifyUser } from "utils/verifyUser";
import { getServerSession } from "next-auth";
import authOptions from "../../../../auth.config";

export async function GET(
  req: NextRequest,
  { params }: { params: { uid: string } },
) {
  try {
    const post = await prisma.comment.findMany({
      where: {
        postUid: Number(params.uid),
      },
    });
    return NextResponse.json(post, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { uid: string } },
) {
  try {
    const session = await getServerSession(authOptions);
    const userVerification = await verifyUser(session);
    if (userVerification) return userVerification;

    const requestData = await req.json();
    const form = cloneDeep(requestData);
    await prisma.comment.update({
      data: form,
      where: {
        uid: Number(params.uid),
      },
    });
    return NextResponse.json(
      { message: "delete Successfully!" },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { uid: string } },
) {
  try {
    const session = await getServerSession(authOptions);
    const userVerification = await verifyUser(session);
    if (userVerification) return userVerification;

    await prisma.comment.delete({
      where: {
        uid: Number(params.uid),
      },
    });
    return NextResponse.json(
      { message: "delete Successfully!" },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}