import { NextRequest, NextResponse } from "next/server";
import authCheck from "utils/authCheck";
import { fileRenamer, uploadS3 } from "utils/s3-uploader";

export async function POST(req: NextRequest) {
  try {
    const user = await authCheck(req);
    if (!user) {
      return NextResponse.json(
        { message: "No user found." },
        {
          status: 401,
          headers: {
            "Set-Cookie": `accessToken=;Path=/;HttpOnly;Max-Age=0;`,
          },
        },
      );
    }
    const formData = await req.formData();
    const file = [...formData.entries()][0];
    if (!file)
      return NextResponse.json({ message: "no file" }, { status: 500 });
    const [key, value] = file;
    const buffer = Buffer.from(await (value as any)?.arrayBuffer());
    const assetUniqName = fileRenamer(key);
    const result = await uploadS3(
      buffer,
      "klog",
      assetUniqName,
      (value as any).type,
    );
    if (!result?.Location)
      return NextResponse.json({ message: "s3 error" }, { status: 500 });
    return NextResponse.json({ url: result.Location }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
