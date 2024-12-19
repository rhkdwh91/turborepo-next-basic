import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient, queryKeys } from "queryKeys";

import View from "./view";
import { auth } from "@/auth";

export default async function Page() {
  const session = await auth();
  const queryClient = getQueryClient();
  await Promise.all([
    queryClient.prefetchQuery({
      ...queryKeys.posts.list({
        skip: 0,
        take: 100,
        username: session?.user?.username,
      }),
    }),
  ]);

  const dehydratedState = dehydrate(queryClient);
  return (
    <HydrationBoundary state={dehydratedState}>
      <View />
    </HydrationBoundary>
  );
}
