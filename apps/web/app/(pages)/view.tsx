"use client";

import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useSearchParams, useRouter } from "next/navigation";
import { queryKeys } from "queryKeys";
import { Post } from "types/post";
import useInfiniteScroll from "hooks/useInfiniteScroll";

import PostCard from "components/ui/organism/PostCard";
import { Button } from "@ui/src/components/atom/Button";
import { Skeleton } from "@ui/src/components/atom/Skeleton";

function createTagArray(searchTags: string[] | string) {
  if (Array.isArray(searchTags)) {
    return [...searchTags];
  } else if (searchTags) {
    return [searchTags];
  }
  return [];
}

export default function View() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchTags = searchParams.getAll("tag");
  const { data, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useInfiniteQuery<Post[]>({
      ...queryKeys.infinityPosts.list({
        tag: createTagArray(searchTags),
      }),
      queryKey: ["list", { tag: createTagArray(searchTags) }],
      initialPageParam: 0,
      getNextPageParam: (prevPage, allPages) => {
        const isLastPage = prevPage.length < 8;
        return isLastPage ? undefined : allPages.length;
      },
    });

  const { data: tags } = useQuery(queryKeys.tags.list());

  const [lastElementRef] = useInfiniteScroll({
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  });

  const handleClickTag = (tagName: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (searchTags.includes(tagName)) {
      params.delete("tag", tagName);
      router.push("?" + params.toString());
      return;
    }
    params.append("tag", tagName);
    router.push("?" + params.toString());
  };

  const handleClickReset = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("tag");
    router.push("?" + params.toString());
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-6xl mx-auto pb-20">
        <div className="flex gap-4 my-6">
          <Button
            variant="outline"
            className="text-white"
            onClick={handleClickReset}
          >
            reset
          </Button>
          {tags?.map((tag) => (
            <Button
              key={tag.value}
              variant={
                searchTags.includes(tag.value) ? "destructive" : "outline"
              }
              className="text-white"
              onClick={() => handleClickTag(tag.name)}
            >
              {tag.value}
            </Button>
          ))}
        </div>
        <div className="flex flex-wrap gap-4">
          {data?.pages.map((page) =>
            page?.map((post) => <PostCard post={post} key={post.uid} />),
          )}
          {!isFetchingNextPage && hasNextPage && (
            <div ref={lastElementRef} className="w-full h-2" />
          )}
          {hasNextPage && (
            <>
              <Skeleton className="h-[230px] w-[250px] rounded-xl" />
              <Skeleton className="h-[230px] w-[400px] rounded-xl" />
              <Skeleton className="h-[230px] w-[300px] rounded-xl" />
              <Skeleton className="h-[230px] w-[250px] rounded-xl" />
              <Skeleton className="h-[230px] w-[400px] rounded-xl" />
              <Skeleton className="h-[230px] w-[300px] rounded-xl" />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
