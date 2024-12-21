import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import prisma from "prisma/client";
import { cloneDeep } from "lodash";
import authCheck from "@/shared/lib/utils/authCheck";
import { errorHandler } from "@/shared/lib/utils/apiErrorHandler";

const getPosts = async (payload: {
  take: string | null;
  skip: string | null;
  tags: string[];
  username: string | null;
}) => {
  const { take, skip, tags, username } = payload;
  return prisma.post.findMany({
    take: take && !Number.isNaN(Number(take)) ? Number(take) : 20,
    skip: skip && !Number.isNaN(Number(skip)) ? Number(skip) : 0,
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
      postView: true,
    },
    where: {
      OR:
        tags.length > 0
          ? tags.map((tag) => ({
              tags: {
                path: "$[*].name",
                array_contains: tag,
              },
            }))
          : undefined,
      user: {
        username: username ? username : undefined,
      },
    },
    orderBy: {
      uid: "desc",
    },
  });
};

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const tags = searchParams.getAll("tag");
    const take = searchParams.get("take");
    const skip = searchParams.get("skip");
    const username = searchParams.get("username");
    const posts = await getPosts({ tags, take, skip, username });
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
