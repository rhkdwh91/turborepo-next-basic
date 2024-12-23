import { NextRequest, NextResponse } from "next/server";
import authCheck from "@/shared/lib/utils/authCheck";
import { cloneDeep } from "lodash";
import prisma from "@/prisma/client";
import { errorHandler } from "@/shared/lib/utils/apiErrorHandler";

export async function POST(req: NextRequest) {
  try {
    await authCheck(req);
    const requestData = await req.json();
    const form = cloneDeep(requestData);

    const status = form.status;

    if (status === "ACCEPT") {
      await prisma.user.update({
        data: {
          level: 2,
        },
        where: {
          uid: form.userUid,
        },
      });
    }

    if (status === "REJECT") {
      await prisma.user.update({
        data: {
          level: 3,
        },
        where: {
          uid: form.userUid,
        },
      });
    }

    await prisma.writerApplication.create({
      data: form,
    });

    return NextResponse.json({ message: "ok" }, { status: 201 });
  } catch (error) {
    console.log(error);
    return errorHandler(error);
  }
}
