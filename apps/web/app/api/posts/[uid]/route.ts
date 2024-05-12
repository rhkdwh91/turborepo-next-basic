import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import prisma from "prisma/client";
import { cloneDeep } from "lodash";
import { getServerSession } from "next-auth";
import authOptions from "auth.config";

export async function GET(
  req: NextRequest,
  { params }: { params: { uid: string } },
) {
  try {
    const post = await prisma.post.findUnique({
      where: {
        uid: Number(params.uid),
      },
      include: {
        comments: {
          include: {
            user: true,
          },
        },
        user: true,
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
    if (!session?.user) {
      return NextResponse.json(
        { message: "No user found." },
        {
          status: 401,
          headers: {
            "Set-Cookie": `accessToken=;Path=/;HttpOnly;Max-Age=0;`,
          },
        },
      );
    }
    const requestData = await req.json();
    const form = cloneDeep(requestData);
    form.userUid = session.user.uid;
    await prisma.post.update({
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
    if (!session) {
      return NextResponse.json(
        { message: "No user found." },
        {
          status: 401,
          headers: {
            "Set-Cookie": `accessToken=;Path=/;HttpOnly;Max-Age=0;`,
          },
        },
      );
    }
    await prisma.post.delete({
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
