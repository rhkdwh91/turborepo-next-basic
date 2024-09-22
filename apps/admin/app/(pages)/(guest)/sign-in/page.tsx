import View from "./view";
import { getServerSession } from "next-auth";
import authOptions from "@/auth.config";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await getServerSession(authOptions);
  if (session?.user?.level && session.user.level === 1) return redirect("/");
  return <View />;
}
