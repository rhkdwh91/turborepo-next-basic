// import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
// import { getQueryClient, queryKeys } from "queryKeys";
import View from "./view";

interface PageParams {
  searchParams: {
    tag?: string[] | string;
  };
}

/*
export default async function Page({ searchParams }: PageParams) {
  const queryClient = getQueryClient();
  const search = await searchParams;
  const params: { tag: string[] } = { tag: [] };
  if (search.tag) {
    params.tag = Array.isArray(search.tag) ? [...search.tag] : [search.tag];
  }
  await Promise.all([
    queryClient.prefetchQuery(queryKeys.infinityPosts.list(params)),
    queryClient.prefetchQuery(queryKeys.tags.list()),
  ]);
  const dehydratedState = dehydrate(queryClient);
  return (
    <HydrationBoundary state={dehydratedState}>
      <View />
    </HydrationBoundary>
  );
}*/

export default function Page() {
  return <View />;
}
