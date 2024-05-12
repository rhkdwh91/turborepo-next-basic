import View from "./view";
import { getServerSession } from "next-auth";
import authOptions from "auth.config";

export default async function Page() {
  const session = await getServerSession(authOptions);
  return <View user={session?.user} />;
}
