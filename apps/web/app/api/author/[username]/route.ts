import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import prisma from "prisma/client";
import { errorHandler } from "@/shared/lib/utils/apiErrorHandler";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ username: string }> },
) {
  try {
    const { username } = await params;
    const user = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });
    const level = user?.level ?? null;
    if (level !== null && level <= 1) {
      return NextResponse.json(user, { status: 200 });
    }
    return NextResponse.json({ message: "not user" }, { status: 404 });
  } catch (error) {
    return errorHandler(error);
  }
}
