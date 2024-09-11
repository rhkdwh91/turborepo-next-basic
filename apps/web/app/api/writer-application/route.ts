import { NextRequest, NextResponse } from "next/server";
import authCheck from "@/utils/authCheck";
import { cloneDeep } from "lodash";
import prisma from "@/prisma/client";
import { errorHandler } from "@/utils/apiErrorHandler";

export async function GET(req: NextRequest) {
  try {
    const user = await authCheck(req);
    const searchParams = req.nextUrl.searchParams;
    const take = searchParams.get("take");
    const skip = searchParams.get("skip");
    const userUid = searchParams.get("userUid");

    const where: any = {};

    if (userUid) {
      where.userUid = userUid;
    }

    const writerApplicationUsers = await prisma.writerApplicationUsers.findMany(
      {
        take: take && !Number.isNaN(Number(take)) ? Number(take) : 20,
        skip: skip && !Number.isNaN(Number(skip)) ? Number(skip) : 0,
        where: where,
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
        },
      },
    );
    console.log(writerApplicationUsers, user);
    return NextResponse.json(writerApplicationUsers, { status: 201 });
  } catch (error) {
    return errorHandler(error);
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await authCheck(req);
    const requestData = await req.json();
    const form = cloneDeep(requestData);
    form.userUid = user.uid;
    await prisma.writerApplication.create({
      data: form,
    });
    await prisma.writerApplicationUsers.create({
      data: {
        userUid: user.uid,
      },
    });

    return NextResponse.json({ message: "ok" }, { status: 201 });
  } catch (error) {
    console.log(error);
    return errorHandler(error);
  }
}
