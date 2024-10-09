import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import authOptions from "@/auth.config";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  if (!session || (session?.user?.level && session.user.level > 1))
    return redirect("/sign-in");

  return <>{children}</>;
}
