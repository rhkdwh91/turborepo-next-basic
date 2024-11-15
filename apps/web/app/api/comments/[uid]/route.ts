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
    const comment = await prisma.comment.findUnique({
      where: {
        uid: Number(params.uid),
      },
    });
    return NextResponse.json(comment, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { uid: string } },
) {
  try {
    await authCheck(req);

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
    return errorHandler(error);
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { uid: string } },
) {
  try {
    await authCheck(req);

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
    return errorHandler(error);
  }
}
