import { NextRequest } from "next/server";
import { verifyJWT } from "./signJWT";
import prisma from "prisma/client";

const COOKIES = {
  accessToken: "accessToken",
  refreshToken: "refreshToken",
};

const authCheck = async (req: NextRequest) => {
  const accessToken = req.cookies.get(COOKIES.accessToken);
  if (!accessToken) {
    return false;
  }
  const decode = await verifyJWT(accessToken.value);
  if (!decode.payload?.username) {
    return false;
  }
  const user = await prisma.user.findUnique({
    where: {
      username: String(decode.payload?.username),
    },
  });

  if (!user) {
    return false;
  }
  return user;
};

export default authCheck;
