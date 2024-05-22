import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient, queryKeys } from "queryKeys";

import View from "./view";

export default async function Page() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(queryKeys.profile.detail());

  const dehydratedState = dehydrate(queryClient);
  return (
    <HydrationBoundary state={dehydratedState}>
      <View />
    </HydrationBoundary>
  );
}
