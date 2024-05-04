import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import prisma from "prisma/client";
import { cloneDeep } from "lodash";
import authCheck from "utils/authCheck";

export async function GET() {
  try {
    const tags = await prisma.tag.findMany({
      take: 10,
      orderBy: {
        createAt: "desc",
      },
    });
    return NextResponse.json(tags, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: error }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await authCheck(req);
    if (!user) {
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
    await prisma.tag.create({ data: form });
    return NextResponse.json(
      { message: "tags updated successful!" },
      { status: 201 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
