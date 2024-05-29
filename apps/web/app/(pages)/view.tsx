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
          xl: "275px",
        }}
        marginY={{
          base: 4,
          md: 4,
          xl: 0,
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
            <Text fontSize={13}>createdAt {createAt}</Text>
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
  const { data } = useInfiniteQuery({
    ...queryKeys.infinityPosts.list({
      tag: createTagArray(searchTags),
    }),
    queryKey: ["list", { tag: createTagArray(searchTags) }],
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      console.log(lastPage, "LAST_PAGE");
      return 1;
    },
    getPreviousPageParam: (firstPage) => {
      console.log(firstPage, "NEXT_PAGE");
      return 0;
    },
  });
  const { data: tags } = useQuery(queryKeys.tags.list());

  console.log(data);

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
        <Box display={{ md: "block", xl: "flex" }} flexWrap={"wrap"} gap={4}>
          {data?.pages.map((page: any) =>
            page?.map((post: any) => <PostCard post={post} key={post.uid} />),
          )}
        </Box>
      </div>
    </main>
  );
}
