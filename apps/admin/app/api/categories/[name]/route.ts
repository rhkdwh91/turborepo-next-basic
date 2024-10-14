import { NextRequest, NextResponse } from "next/server";
import authCheck from "@/utils/authCheck";
import { errorHandler } from "@/utils/apiErrorHandler";
import { connectDb } from "@/db";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { name: string } },
) {
  try {
    await authCheck(req);
    const connection = await connectDb();

    await connection.execute(`DELETE FROM Category WHERE name = ?`, [
      params.name,
    ]);

    return NextResponse.json(
      { message: "delete Successfully!" },
      { status: 201 },
    );
  } catch (error) {
    return errorHandler(error);
  }
}
