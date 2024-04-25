import { PrismaClient } from "@prisma/client";
import View from "./view";

const prisma = new PrismaClient();

export default async function Page() {
  console.log(
    await prisma.post.findMany({
      orderBy: {
        createAt: "asc",
      },
    }),
  );
  return <View />;
}
