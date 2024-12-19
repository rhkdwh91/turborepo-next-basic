import { redirect } from "next/navigation";
import View from "./view";
import { getQueryClient, queryKeys } from "@/queryKeys";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { auth } from "@/auth.config";

export default async function Page() {
  const session = await auth();
  if ((session?.user?.level && session.user.level < 2) || !session)
    return redirect("/");

  const queryClient = getQueryClient();
  await Promise.all([
    queryClient.prefetchQuery(queryKeys.categories.list()),
    queryClient.prefetchQuery(queryKeys.writerApplication.detail()),
  ]);
  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <View />
    </HydrationBoundary>
  );
}
