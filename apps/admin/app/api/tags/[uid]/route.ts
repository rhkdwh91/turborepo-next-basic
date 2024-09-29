import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cloneDeep } from "lodash";
import authCheck from "@/utils/authCheck";
import { errorHandler } from "@/utils/apiErrorHandler";
import { connectDb } from "@/db";

export async function GET(
  req: NextRequest,
  { params }: { params: { uid: string } },
) {
  try {
    const connection = await connectDb();
    const [tags] = await connection.execute(`SELECT * FROM tag WHERE uid = ?`, [
      Number(params.uid),
    ]);

    const tag = (tags as any)[0]; // 가장 첫 번째 결과를 선택
    return NextResponse.json(tag, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { uid: string } },
) {
  try {
    await authCheck(req);

    const requestData = await req.json();
    const form = cloneDeep(requestData);
    const connection = await connectDb();
    await connection.execute(`UPDATE Tag SET ? WHERE uid = ?`, [
      form,
      Number(params.uid),
    ]);
    return NextResponse.json(
      { message: "delete Successfully!" },
      { status: 201 },
    );
  } catch (error) {
    return errorHandler(error);
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { name: string } },
) {
  try {
    await authCheck(req);
    const connection = await connectDb();
    await connection.execute(`DELETE FROM Tag WHERE name = ?`, [params.name]);
    return NextResponse.json(
      { message: "delete Successfully!" },
      { status: 201 },
    );
  } catch (error) {
    return errorHandler(error);
  }
}
