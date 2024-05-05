import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient, queryKeys } from "queryKeys";
import View from "./view";

interface PageParams {
  searchParams: {
    tag?: string[] | string;
  };
}

export default async function Page({ searchParams }: PageParams) {
  const queryClient = getQueryClient();
  const tag = searchParams.tag;
  const params: { tag: string[] } = { tag: [] };
  if (tag) {
    params.tag = Array.isArray(tag) ? [...tag] : [tag];
  }
  await Promise.all([
    queryClient.prefetchQuery(queryKeys.posts.list(params)),
    queryClient.prefetchQuery(queryKeys.tags.list()),
  ]);
  const dehydratedState = dehydrate(queryClient);
  return (
    <HydrationBoundary state={dehydratedState}>
      <View />
    </HydrationBoundary>
  );
}
