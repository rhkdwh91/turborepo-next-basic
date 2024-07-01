import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import prisma from "prisma/client";
import { cloneDeep } from "lodash";
import authCheck from "utils/authCheck";
import { errorHandler } from "@/utils/apiErrorHandler";

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      take: 10,
      orderBy: {
        createAt: "desc",
      },
      include: {
        tags: true,
      },
    });
    return NextResponse.json(
      categories.map((category) => ({
        uid: category.uid,
        name: category.name,
        value: category.value,
        tags: category.tags,
      })),
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
    await prisma.category.create({ data: form });
    return NextResponse.json(
      { message: "categories updated successful!" },
      { status: 201 },
    );
  } catch (error) {
    return errorHandler(error);
  }
}
