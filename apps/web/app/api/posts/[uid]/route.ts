import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import prisma from "prisma/client";
import { cloneDeep } from "lodash";
import authCheck from "@/utils/authCheck";
import { errorHandler } from "@/utils/apiErrorHandler";

export async function GET(
  req: NextRequest,
  { params }: { params: { uid: string } },
) {
  try {
    const { uid } = await params;
    const post = await prisma.post.findUnique({
      where: {
        uid: Number(uid),
      },
      include: {
        comments: {
          include: {
            user: {
              select: {
                uid: true,
                username: true,
                email: true,
                level: true,
                profileImage: true,
                createAt: true,
                updateAt: true,
              },
            },
          },
        },
        user: {
          select: {
            uid: true,
            username: true,
            email: true,
            level: true,
            profileImage: true,
            createAt: true,
            updateAt: true,
          },
        },
        postView: true,
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
    const user = await authCheck(req);
    const requestData = await req.json();
    const form = cloneDeep(requestData);
    form.userUid = user.uid;
    const { uid } = await params;
    await prisma.post.update({
      data: form,
      where: {
        uid: Number(uid),
      },
    });
    return NextResponse.json(
      { message: "delete Successfully!" },
      { status: 201 },
    );
  } catch (error) {
    return errorHandler(error);
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { uid: string } },
) {
  try {
    await authCheck(req);
    const { uid } = await params;
    await prisma.post.delete({
      where: {
        uid: Number(uid),
      },
    });
    return NextResponse.json(
      { message: "delete Successfully!" },
      { status: 201 },
    );
  } catch (error) {
    return errorHandler(error);
  }
}
