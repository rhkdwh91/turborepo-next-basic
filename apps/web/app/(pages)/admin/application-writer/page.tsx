import { redirect } from "next/navigation";
import View from "./view";
import { auth } from "@/auth.config";

export default async function Page() {
  const session = await auth();
  if (session?.user?.level !== 1) return redirect("/");
  return <View />;
}
