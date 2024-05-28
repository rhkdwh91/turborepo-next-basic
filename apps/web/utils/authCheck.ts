import { NextRequest } from "next/server";
import { verifyJWT } from "./signJWT";
import { UserToken } from "types/user";

class AuthError extends Error {
  status: number;
  message: string;
  constructor(status: number, message: string) {
    super();
    this.status = status;
    this.message = message;
  }
}

const authCheck = async (req: NextRequest): Promise<UserToken> => {
  const accessToken = req.headers.get("authorization");
  if (!accessToken) {
    throw new AuthError(403, "accessToken이 없음");
  }
  const { payload } = await verifyJWT(accessToken.replace("Bearer ", ""));
  if (!payload?.username) {
    throw new AuthError(403, "사용 불가능한 accessToken");
  }
  return payload;
};

export default authCheck;
