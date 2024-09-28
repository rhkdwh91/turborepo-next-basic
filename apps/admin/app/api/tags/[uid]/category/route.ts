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
    const keys = Object.keys(form);
    const values = Object.values(form);
    values.push(Number(params.uid));

    const updates = keys.map((key) => `${key} = ?`).join(", ");

    const sql = `UPDATE tag SET ${updates} WHERE uid = ?`;

    const connection = await connectDb();

    await connection.execute(sql, values);
    return NextResponse.json(
      { message: "delete Successfully!" },
      { status: 201 },
    );
  } catch (error) {
    return errorHandler(error);
  }
}
