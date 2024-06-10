import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import prisma from "prisma/client";
import { cloneDeep } from "lodash";
import authCheck from "@/utils/authCheck";
import { errorHandler } from "@/utils/apiErrorHandler";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const tags = searchParams.getAll("tag");
    const take = searchParams.get("take");
    const skip = searchParams.get("skip");
    const posts = await prisma.post.findMany({
      take: take && !Number.isNaN(Number(take)) ? Number(take) : 20,
      skip: skip && !Number.isNaN(Number(skip)) ? Number(skip) : 0,
      include: {
        user: true,
        postView: true,
      },
      where:
        tags.length > 0
          ? {
              OR: tags.map((tag) => ({
                tags: {
                  path: "$[*].name",
                  array_contains: tag,
                },
              })),
            }
          : undefined,
      orderBy: {
        uid: "desc",
      },
    });
    return NextResponse.json(posts, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: error }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await authCheck(req);
    const requestData = await req.json();
    const form = cloneDeep(requestData);
    form.userUid = user.uid;
    await prisma.post.create({ data: form });
    return NextResponse.json({ message: "ok" }, { status: 201 });
  } catch (error) {
    return errorHandler(error);
  }
}
