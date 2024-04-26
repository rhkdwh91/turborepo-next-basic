import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient, queryKeys } from "queryKeys";
import View from "./view";

export default async function Page() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(queryKeys.posts.list());
  const dehydratedState = dehydrate(queryClient);
  return (
    <HydrationBoundary state={dehydratedState}>
      <View />
    </HydrationBoundary>
  );
}
