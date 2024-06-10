"use client";

import { useMemo } from "react";
import {
  Card,
  Stack,
  CardBody,
  Heading,
  Text,
  Box,
  Tag,
  Divider,
} from "@chakra-ui/react";
import { RepeatIcon } from "@chakra-ui/icons";

import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useSearchParams, useRouter } from "next/navigation";
import { queryKeys } from "queryKeys";
import Link from "next/link";
import { Post } from "types/post";
import ProfileImage from "@repo/ui/components/atom/ProfileImage";
import styles from "./page.module.css";
import useInfiniteScroll from "hooks/useInfiniteScroll";

interface PostCardProps {
  post: Post;
}

function PostCard({ post }: PostCardProps) {
  const content = useMemo(() => {
    const parseContent = JSON.parse(post.content);
    const rootChildrenText =
      parseContent.root.children[0]?.children[0]?.text ??
      "" + parseContent.root.children[1]?.children[0]?.text ??
      "";
    if (rootChildrenText) {
      return String(rootChildrenText);
    }
    return "";
  }, [post]);

  const createAt = useMemo(() => {
    return post.createAt.split("T")[0];
  }, [post]);
  return (
    <Link href={`/post/${post.uid}`}>
      <Card
        key={post.uid}
        w={{
          base: "100%",
          md: "100%",
          xl: "100%",
        }}
        marginY={{
          base: 4,
          md: 4,
          xl: 4,
        }}
        height={{
          xl: "100%",
        }}
      >
        <CardBody>
          <Stack>
            <Heading
              fontSize="2xl"
              className={styles.title_line_clamp}
              minHeight="60px"
              maxHeight="60px"
              fontWeight={600}
            >
              {post.title}
            </Heading>
            <Divider marginY={2} />
            <Text className={styles.line_clamp} minHeight={70} maxHeight={70}>
              {content}...
            </Text>
            <Divider marginY={2} />
            <Box
              display="flex"
              justifyContent="flex-start"
              flexWrap="wrap"
              gap={2}
            >
              {post.tags?.map((tag) => <Tag key={tag.name}>{tag.value}</Tag>)}
            </Box>
            <div className="flex items-center">
              <ProfileImage src={post.user?.profileImage ?? ""} />
              <Text fontSize={13}>{post.user?.username}</Text>
            </div>
            <Text fontSize={13}>{post.postView?.count ?? 0} Views</Text>
            <Text fontSize={13}>{createAt} createdAt</Text>
          </Stack>
        </CardBody>
      </Card>
    </Link>
  );
}

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
    <main className={styles.main}>
      <div className={styles.layout}>
        <Box
          display={"flex"}
          justifyContent={"flex-start"}
          gap={2}
          flexWrap="wrap"
          marginBottom={10}
        >
          <Tag cursor="pointer" variant="outline" onClick={handleClickReset}>
            <RepeatIcon />
          </Tag>
          {tags?.map((tag) => (
            <Tag
              key={tag.name}
              cursor="pointer"
              size={"lg"}
              colorScheme={"teal"}
              variant={searchTags.includes(tag.name) ? "solid" : "outline"}
              onClick={() => handleClickTag(tag.name)}
            >
              {tag.value}
            </Tag>
          ))}
        </Box>
        <Box display={{ md: "block", xl: "block" }} flexWrap={"wrap"} gap={4}>
          {data?.pages.map((page) =>
            page?.map((post) => <PostCard post={post} key={post.uid} />),
          )}
          {!isFetchingNextPage && hasNextPage && (
            <div ref={lastElementRef} className="w-full h-2">
              FETCH
            </div>
          )}
        </Box>
      </div>
    </main>
  );
}
