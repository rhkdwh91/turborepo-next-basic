import { NextRequest, NextResponse } from "next/server";
import authCheck from "@/utils/authCheck";
import { errorHandler } from "@/utils/apiErrorHandler";
import { connectDb } from "@/db";
import { FieldPacket } from "mysql2/promise";

export async function GET(
  req: NextRequest,
  { params }: { params: { uid: string } },
) {
  try {
    const user = await authCheck(req);
    const searchParams = req.nextUrl.searchParams;
    const take = searchParams.get("take");
    const skip = searchParams.get("skip");
    const userUid = Number(params.uid);

    const connection = await connectDb();

    let whereClause = " ";
    let userData = [];

    if (userUid) {
      whereClause = "WHERE userUid = ?";
      userData.push(userUid);
    }

    const query =
      `SELECT * FROM WriterApplicationUsers ` +
      whereClause +
      `LIMIT ? OFFSET ?`;

    userData.push(Number(take) || 20);
    userData.push(Number(skip) || 0);

    const [rows]: [any, FieldPacket[]] = await connection.execute(
      query,
      userData,
    );

    const writerApplicationUsers = rows.map((row: any) => ({ ...row }));

    await connection.end();

    return NextResponse.json(writerApplicationUsers, { status: 201 });
  } catch (error) {
    return errorHandler(error);
  }
}
