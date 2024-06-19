import NextAuth from "next-auth/next";
import authOptions from "auth.config";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  return await NextAuth(req, res, authOptions);
};
export { handler as GET, handler as POST };
