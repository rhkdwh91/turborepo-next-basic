import { NextRequest, NextResponse } from "next/server";
import authCheck from "@/utils/authCheck";
import { cloneDeep } from "lodash";
import { errorHandler } from "@/utils/apiErrorHandler";
import { connectDb } from "@/db";
import { FieldPacket } from "mysql2/promise";

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

    const connection = await connectDb();

    const [writerApplicationUsers]: [any, FieldPacket[]] =
      await connection.execute(
        `SELECT user.uid, user.username, user.email, user.level, user.profileImage, user.createAt, user.updateAt
  FROM writerApplicationUsers INNER JOIN user ON writerApplicationUsers.id = user.id
  ORDER BY user.uid DESC LIMIT ? OFFSET ?`,
        [take, skip],
      );

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
    const connection = await connectDb();

    const writerAppData = [user.uid, form.status, form.content];

    const writerAppQuery = `INSERT INTO WriterApplication (userUid, status, content) 
                        VALUES (?, ?, ?)`;

    await connection.execute(writerAppQuery, writerAppData);

    const writerAppUsersData = [user.uid];

    const writerAppUsersQuery = `INSERT INTO WriterApplicationUsers (userUid) 
                             VALUES (?)`;

    await connection.execute(writerAppUsersQuery, writerAppUsersData);

    await connection.end();
    return NextResponse.json({ message: "ok" }, { status: 201 });
  } catch (error) {
    console.log(error);
    return errorHandler(error);
  }
}
