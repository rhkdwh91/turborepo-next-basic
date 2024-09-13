import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import View from "./view";
import authOptions from "auth.config";

export default async function Page() {
  const session = await getServerSession(authOptions);
  console.log(session);
  if ((session?.user?.level && session.user.level < 2) || !session)
    return redirect("/");
  return <View />;
}
