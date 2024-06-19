import View from "./view";
import { getQueryClient, queryKeys } from "queryKeys";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getServerSession } from "next-auth";
import authOptions from "@/auth.config";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await getServerSession(authOptions);
  if (session?.user?.level && session.user.level > 2) return redirect("/");
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(queryKeys.tags.list());
  const dehydratedState = dehydrate(queryClient);
  return (
    <HydrationBoundary state={dehydratedState}>
      <View />
    </HydrationBoundary>
  );
}
