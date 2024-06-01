import { NextResponse } from "next/server";

export const errorHandler = (error: any) => {
  if (error?.code === "ERR_JWT_EXPIRED") {
    return NextResponse.json({ message: "expired" }, { status: 401 });
  }
  if (error.code === "P2002")
    return NextResponse.json(
      {
        message: `${error.meta.modelName} data ${error.meta.target} already exists`,
      },
      { status: 409 },
    );
  return NextResponse.json({ message: error }, { status: 500 });
};
