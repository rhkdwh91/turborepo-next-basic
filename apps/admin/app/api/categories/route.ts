import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cloneDeep } from "lodash";
import authCheck from "utils/authCheck";
import { errorHandler } from "@/utils/apiErrorHandler";
import { connectDb } from "@/db";
import { FieldPacket } from "mysql2/promise";

export async function GET() {
  try {
    const connection = await connectDb();

    const [categories]: [any, FieldPacket[]] = await connection.execute(
      `SELECT categories.*, tags.* FROM categories 
     LEFT JOIN tags ON categories.id = tags.categoryId 
     ORDER BY categories.createAt DESC 
     LIMIT 10`,
    );
    return NextResponse.json(
      categories.map((category: any) => ({
        uid: category.uid,
        name: category.name,
        value: category.value,
        tags: category.tags,
      })),
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

    await connection.execute(
      `INSERT INTO Category (name, value, createAt, updateAt) VALUES (?, ?, ?, ?)`,
      [form.name, form.value, new Date(), new Date()],
    );
    return NextResponse.json(
      { message: "categories updated successful!" },
      { status: 201 },
    );
  } catch (error) {
    return errorHandler(error);
  }
}
