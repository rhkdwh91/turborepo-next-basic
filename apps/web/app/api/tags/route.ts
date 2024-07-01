import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import prisma from "prisma/client";
import { cloneDeep } from "lodash";
import authCheck from "utils/authCheck";
import { errorHandler } from "@/utils/apiErrorHandler";

export async function GET() {
  try {
    const tags = await prisma.tag.findMany({
      take: 10,
      orderBy: {
        createAt: "desc",
      },
    });
    return NextResponse.json(
      tags.map((tag) => ({ uid: tag.uid, name: tag.name, value: tag.value })),
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await authCheck(req);
    const requestData = await req.json();
    const form = cloneDeep(requestData);
    await prisma.tag.create({ data: form });
    return NextResponse.json(
      { message: "tags updated successful!" },
      { status: 201 },
    );
  } catch (error) {
    return errorHandler(error);
  }
}
