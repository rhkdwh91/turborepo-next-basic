import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { connectDb } from "@/db";
import authCheck, { AuthError } from "@/utils/authCheck";
import { errorHandler } from "@/utils/apiErrorHandler";
import { cloneDeep } from "lodash";

export async function PUT(
  req: NextRequest,
  { params }: { params: { uid: string } },
) {
  try {
    const user = await authCheck(req);
    if (user?.level && user.level > 1) {
      new AuthError(403, "권한이 부족합니다.");
    }
    const requestData = await req.json();
    const form = cloneDeep(requestData);
    console.log(form);
    const connection = await connectDb();
    await connection.execute(`UPDATE User SET level = ? WHERE uid = ?`, [
      Number(form.level),
      Number(params.uid),
    ]);

    return NextResponse.json(
      { message: "level modify Successfully!" },
      { status: 201 },
    );
  } catch (error) {
    return errorHandler(error);
  }
}