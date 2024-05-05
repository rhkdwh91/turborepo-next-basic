"use client";

import { useMemo } from "react";
import {
  Card,
  Stack,
  Heading,
  CardBody,
  Text,
  Box,
  Tag,
  Divider,
} from "@chakra-ui/react";

import { useQuery } from "@tanstack/react-query";
import { useSearchParams, useRouter } from "next/navigation";
import { queryKeys } from "queryKeys";
import Link from "next/link";
import { Post } from "types/post";
import styles from "./page.module.css";

interface PostCardProps {
  post: Post;
}

function PostCard({ post }: PostCardProps) {
  const content = useMemo(() => {
    const parseContent = JSON.parse(post.content);
    const rootChildrenText = parseContent.root.children[0]?.children[0]?.text;
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
      >
        <CardBody>
          <Stack>
            <Heading fontSize="2xl">{post.title}</Heading>
            <Divider marginY={2} />
            <Text>{content}...</Text>
            <Divider marginY={2} />
            <Text fontSize={13}>Writer {post.username}</Text>
            <Box
              display="flex"
              justifyContent="flex-start"
              flexWrap="wrap"
              gap={2}
            >
              {post.tags?.map((tag) => <Tag key={tag.name}>{tag.value}</Tag>)}
            </Box>
            <Text fontSize={13}>createdAt {createAt}</Text>
          </Stack>
        </CardBody>
      </Card>
    </Link>
  );
}

export default function View() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchTags = searchParams.getAll("tag");
  const { data } = useQuery(
    queryKeys.posts.list({
      tag: Array.isArray(searchTags)
        ? [...searchTags]
        : searchTags
          ? [searchTags]
          : [],
    }),
  );
  const { data: tags } = useQuery(queryKeys.tags.list());

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
          {tags?.map((tag) => (
            <Tag
              key={tag.name}
              cursor="pointer"
              colorScheme={searchTags.includes(tag.name) ? "teal" : "gray"}
              onClick={() => handleClickTag(tag.name)}
            >
              {tag.value}
            </Tag>
          ))}
        </Box>
        <Box display={{ md: "block", xl: "flex" }} flexWrap={"wrap"} gap={4}>
          {data?.map((post) => <PostCard post={post} key={post.uid} />)}
        </Box>
      </div>
    </main>
  );
}
