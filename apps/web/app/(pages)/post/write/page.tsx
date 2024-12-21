import View from "./view";
import { getQueryClient, queryKeys } from "shared/lib/queryKeys";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { redirect } from "next/navigation";
import { auth } from "@/auth.config";

export default async function Page() {
  const session = await auth();
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
