import { NextResponse } from "next/server";

export const errorHandler = (error: any) => {
  if (error?.code === "ERR_JWT_EXPIRED") {
    return NextResponse.json({ message: "expired" }, { status: 401 });
  }
  return NextResponse.json({ message: error }, { status: 500 });
};
