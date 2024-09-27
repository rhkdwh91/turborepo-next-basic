import { NextRequest, NextResponse } from "next/server";
import authCheck from "@/utils/authCheck";
import { cloneDeep } from "lodash";
import { errorHandler } from "@/utils/apiErrorHandler";
import { connectDb } from "@/db";

export async function PUT(
  req: NextRequest,
  { params }: { params: { uid: string } },
) {
  try {
    await authCheck(req);

    const requestData = await req.json();
    const form = cloneDeep(requestData);
    const connection = await connectDb();

    await connection.execute(
      `UPDATE Category SET name = ?, value = ? WHERE uid = ?`,
      [form.name, form.value, Number(params.uid)],
    );
    return NextResponse.json(
      { message: "delete Successfully!" },
      { status: 201 },
    );
  } catch (error) {
    return errorHandler(error);
  }
}
