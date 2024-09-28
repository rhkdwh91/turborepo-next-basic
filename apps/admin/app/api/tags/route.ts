import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cloneDeep } from "lodash";
import authCheck from "utils/authCheck";
import { errorHandler } from "@/utils/apiErrorHandler";
import { connectDb } from "@/db";
import { FieldPacket } from "mysql2/promise";
import { Tag } from "@/types/tag";

export async function GET() {
  try {
    const connection = await connectDb();
    const [tags]: [Tag[], FieldPacket[]] = (await connection.execute(
      `SELECT uid, name, value 
       FROM tag 
       ORDER BY createdAt DESC 
       LIMIT 10`,
    )) as [Tag[], FieldPacket[]];

    return NextResponse.json(
      tags.map((tag) => ({ uid: tag.uid, name: tag.name, value: tag.value })),
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await authCheck(req);
    const requestData = await req.json();
    const form = cloneDeep(requestData);
    const connection = await connectDb();
    await connection.execute(`INSERT INTO tag SET ?`, form);
    return NextResponse.json(
      { message: "tags updated successful!" },
      { status: 201 },
    );
  } catch (error) {
    return errorHandler(error);
  }
}
