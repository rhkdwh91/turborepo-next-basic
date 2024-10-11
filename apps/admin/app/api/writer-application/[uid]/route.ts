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

    let whereClause = "";
    let queryParams = [];

    if (userUid) {
      whereClause = "WHERE wa.userUid = ?";
      queryParams.push(userUid);
    }

    const query = `
      SELECT 
        wa.*, 
        u.uid as user_uid, 
        u.username as user_username, 
        u.email as user_email, 
        u.level as user_level, 
        u.profileImage as user_profileImage, 
        u.createAt as user_createAt, 
        u.updateAt as user_updateAt
      FROM WriterApplication wa
      JOIN User u ON wa.userUid = u.uid
      ${whereClause}
      LIMIT ? OFFSET ?
    `;

    queryParams.push(Number(take) || 20);
    queryParams.push(Number(skip) || 0);

    const [rows]: [any, FieldPacket[]] = await connection.execute(
      query,
      queryParams,
    );

    const writerApplications = rows.map((row: any) => ({
      uid: row.uid,
      userUid: row.userUid,
      status: row.status,
      content: row.content ? JSON.parse(row.content) : null,
      createAt: row.createAt,
      updateAt: row.updateAt,
      user: {
        uid: row.user_uid,
        username: row.user_username,
        email: row.user_email,
        level: row.user_level,
        profileImage: row.user_profileImage,
        createAt: row.user_createAt,
        updateAt: row.user_updateAt,
      },
    }));

    await connection.end();

    console.log(writerApplications, user);
    return NextResponse.json(writerApplications, { status: 200 });
  } catch (error) {
    return errorHandler(error);
  }
}
