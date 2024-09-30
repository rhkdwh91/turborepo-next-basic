import { NextRequest, NextResponse } from "next/server";
import authCheck from "@/utils/authCheck";
import { errorHandler } from "@/utils/apiErrorHandler";
import { connectDb } from "@/db";
import { FieldPacket } from "mysql2/promise";

export async function GET(req: NextRequest) {
  try {
    const user = await authCheck(req);
    const connection = await connectDb();

    const userUidData = [user.uid];
    const query = `SELECT * FROM WriterApplication WHERE userUid = ? ORDER BY uid DESC LIMIT 1`;

    const [rows]: [any, FieldPacket[]] = await connection.execute(
      query,
      userUidData,
    );

    const writerApplication = rows[0];
    await connection.end();
    return NextResponse.json(writerApplication, { status: 201 });
  } catch (error) {
    return errorHandler(error);
  }
}
