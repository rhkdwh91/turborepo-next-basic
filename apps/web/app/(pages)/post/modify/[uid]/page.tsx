import View from "./view";
import { getQueryClient, queryKeys } from "queryKeys";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getServerSession } from "next-auth";
import authOptions from "@/auth.config";
import { redirect } from "next/navigation";

interface PageProps {
  params: {
    uid: string;
  };
}

export default async function Page({ params }: PageProps) {
  const session = await getServerSession(authOptions);
  if (session?.user?.level && session.user.level > 2) return redirect("/");
  const uid = Number(params.uid);
  const queryClient = getQueryClient();
  await Promise.all([
    queryClient.prefetchQuery(queryKeys.posts.detail(uid)),
    queryClient.prefetchQuery(queryKeys.tags.list()),
  ]);
  const dehydratedState = dehydrate(queryClient);
  return (
    <HydrationBoundary state={dehydratedState}>
      <View uid={uid} />
    </HydrationBoundary>
  );
}
