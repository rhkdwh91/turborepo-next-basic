import View from "./view";
import { getQueryClient, queryKeys } from "shared/lib/queryKeys";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { redirect } from "next/navigation";
import { auth } from "@/auth.config";

interface PageProps {
  params: Promise<{
    uid: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  const session = await auth();
  if (session?.user?.level && session.user.level > 2) return redirect("/");
  const { uid } = await params;
  const queryClient = getQueryClient();
  await Promise.all([
    queryClient.prefetchQuery(queryKeys.posts.detail(Number(uid))),
    queryClient.prefetchQuery(queryKeys.tags.list()),
  ]);
  const dehydratedState = dehydrate(queryClient);
  return (
    <HydrationBoundary state={dehydratedState}>
      <View uid={Number(uid)} />
    </HydrationBoundary>
  );
}
