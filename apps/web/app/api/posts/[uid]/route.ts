import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import prisma from "prisma/client";

export async function GET(
  req: NextRequest,
  { params }: { params: { uid: string } },
) {
  try {
    const post = await prisma.post.findUnique({
      where: {
        uid: Number(params.uid),
      },
    });
    return NextResponse.json(post, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
