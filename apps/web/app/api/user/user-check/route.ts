import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import prisma from "prisma/client";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const username = searchParams.get("username");
  if (!username) {
    return NextResponse.json(
      { message: "No username found." },
      { status: 401 },
    );
  }

  const user = await prisma.user.findUnique({
    where: {
      username: username,
    },
  });
  if (user) {
    return NextResponse.json({ message: "User already exists" });
  }
  return NextResponse.json({ message: "No username found." }, { status: 401 });
}
