import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cloneDeep } from "lodash";
import authCheck from "utils/authCheck";
import { errorHandler } from "@/utils/apiErrorHandler";
import { connectDb } from "@/db";

export async function GET() {
  try {
    const connection = await connectDb();

    const [rows]: [any, any] = await connection.execute(
      `SELECT 
    Category.uid, Category.name, Category.value,
    Tag.uid as tag_uid, Tag.name as tag_name, Tag.value as tag_value
   FROM Category 
   LEFT JOIN Tag ON Category.uid = Tag.categoryUid 
   ORDER BY Category.createAt DESC`,
    );

    // 결과 처리
    const categoriesMap = new Map<
      number,
      { uid: number; name: string; value: string; tags: any[] }
    >();

    rows.forEach((row: any) => {
      if (!categoriesMap.has(row.uid)) {
        categoriesMap.set(row.uid, {
          uid: row.uid,
          name: row.name,
          value: row.value,
          tags: [],
        });
      }

      if (row.tag_uid) {
        categoriesMap.get(row.uid)!.tags.push({
          uid: row.tag_uid,
          name: row.tag_name,
          value: row.tag_value,
        });
      }
    });

    const categories = Array.from(categoriesMap.values());

    return NextResponse.json(categories, { status: 200 });
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
