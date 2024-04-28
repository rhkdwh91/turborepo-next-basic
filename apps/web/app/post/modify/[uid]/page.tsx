import View from "./view";
import { getQueryClient, queryKeys } from "../../../../queryKeys";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

interface PageProps {
  params: {
    uid: string;
  };
}

export default async function Page({ params }: PageProps) {
  const uid = Number(params.uid);
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(queryKeys.posts.detail(uid));
  const dehydratedState = dehydrate(queryClient);
  return (
    <HydrationBoundary state={dehydratedState}>
      <View uid={uid} />
    </HydrationBoundary>
  );
}
