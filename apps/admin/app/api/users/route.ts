import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import authCheck from "@/utils/authCheck";
import { errorHandler } from "@/utils/apiErrorHandler";
import { connectDb } from "@/db";
import { FieldPacket } from "mysql2/promise";

export async function GET(req: NextRequest) {
  try {
    await authCheck(req);
    const searchParams = req.nextUrl.searchParams;
    const takeParam = searchParams.get("take");
    const skipParam = searchParams.get("skip");
    const take =
      takeParam && !Number.isNaN(Number(takeParam)) ? Number(takeParam) : 100;
    const skip =
      skipParam && !Number.isNaN(Number(skipParam)) ? Number(skipParam) : 0;

    const connection = await connectDb();
    const [rows]: [any, FieldPacket[]] = await connection.execute(
      `SELECT * FROM User ORDER BY uid DESC LIMIT ? OFFSET ?`,
      [take, skip],
    );
    if (rows) {
      return NextResponse.json(rows, { status: 200 });
    }
    return NextResponse.json(
      { message: "No users found with the provided parameters." },
      { status: 400 },
    );
  } catch (error) {
    return errorHandler(error);
  }
}
