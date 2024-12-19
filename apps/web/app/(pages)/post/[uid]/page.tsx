import View from "./view";
import { getQueryClient, queryKeys } from "queryKeys";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import axiosInstance from "shared/lib/axiosInstance";

interface PageProps {
  params: {
    uid: string;
  };
}

export default async function Page({ params }: PageProps) {
  const { uid } = await params;
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(queryKeys.posts.detail(Number(uid)));
  const dehydratedState = dehydrate(queryClient);
  await axiosInstance.put(`/api/posts/${uid}/view`);
  return (
    <HydrationBoundary state={dehydratedState}>
      <View uid={Number(uid)} />
    </HydrationBoundary>
  );
}
