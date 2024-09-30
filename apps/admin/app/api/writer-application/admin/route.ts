import { NextRequest, NextResponse } from "next/server";
import authCheck from "@/utils/authCheck";
import { cloneDeep } from "lodash";
import { errorHandler } from "@/utils/apiErrorHandler";
import { connectDb } from "@/db";

export async function POST(req: NextRequest) {
  try {
    await authCheck(req);
    const requestData = await req.json();
    const form = cloneDeep(requestData);
    const status = form.status;

    const connection = await connectDb();

    if (status === "ACCEPT" || status === "REJECT") {
      let userLevel = status === "ACCEPT" ? 2 : 3;

      await connection.execute(`UPDATE User SET level = ? WHERE uid = ?`, [
        userLevel,
        form.userUid,
      ]);
    }

    await connection.execute(
      `INSERT INTO WriterApplication (userUid, status, content) VALUES (?, ?, ?)`,
      [form.userUid, form.status, form.content],
    );

    await connection.end();

    return NextResponse.json({ message: "ok" }, { status: 201 });
  } catch (error) {
    console.log(error);
    return errorHandler(error);
  }
}
