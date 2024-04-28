import { NextApiResponse } from "next";
import { type NextRequest } from "next/server";
import { verifyJWT } from "utils/signJWT";
import prisma from "prisma/client";

const COOKIES = {
  accessToken: "accessToken",
  refreshToken: "refreshToken",
};

export default async function handler(req: NextRequest, res: NextApiResponse) {
  const accessToken = req.cookies.get(COOKIES.accessToken);
  if (!accessToken) {
    res.status(401).json({
      error: "User is not authenticated",
    });
    return;
  }
  const decode = await verifyJWT(accessToken.value);
  if (!decode.payload?.username) {
    res.status(401).json({
      error: "User is not authenticated",
    });
    return;
  }
  const user = await prisma.user.findUnique({
    where: {
      username: String(decode.payload?.username),
    },
  });

  if (!user) {
    res.status(401).json({
      error: "Unauthorized access: User does not have admin privileges.",
    });
    return;
  }

  // Proceed with the route for authorized users
  // ... implementation of the API Route
}
