import authOptions from "auth.config";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import View from "./view";

export default async function Page() {
  const session = await getServerSession(authOptions);
  if (!session || (session?.user?.level && session.user.level > 1))
    return redirect("/sign-in");

  return <View />;
}
