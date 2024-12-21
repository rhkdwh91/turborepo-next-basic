import { jwtVerify, SignJWT } from "jose";
import { UserToken } from "@/types/user";

export const signJWT = async (payload: UserToken) => {
  const iat = Math.floor(Date.now() / 1000);
  const accessExp = iat + 60 * 5; //초 * 분 * 시 * 일
  const refreshExp = iat + 60 * 60 * 24 * 14;

  const accessToken = await new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setExpirationTime(accessExp)
    .setIssuedAt(iat)
    .setNotBefore(iat)
    .sign(
      new TextEncoder().encode(process.env.NEXT_PUBLIC_ACCESS_TOKEN_SECRET),
    );

  const refreshToken = await new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setExpirationTime(refreshExp)
    .setIssuedAt(iat)
    .setNotBefore(iat)
    .sign(
      new TextEncoder().encode(process.env.NEXT_PUBLIC_REFRESH_TOKEN_SECRET),
    );

  return { accessToken, refreshToken };
};

export const verifyJWT = async (value: string) => {
  return await jwtVerify(
    value,
    new TextEncoder().encode(process.env.NEXT_PUBLIC_ACCESS_TOKEN_SECRET),
  );
};

export const verifyRefreshToken = async (value: string) => {
  return await jwtVerify(
    value,
    new TextEncoder().encode(process.env.NEXT_PUBLIC_REFRESH_TOKEN_SECRET),
  );
};
