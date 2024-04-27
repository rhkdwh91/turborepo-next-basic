"use client";

import { useMemo } from "react";
import { Card, Flex, Stack, Heading, CardBody, Text } from "@chakra-ui/react";

import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../queryKeys";
import Link from "next/link";
import { Post } from "../types/post";

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
  return (
    <Link href={`/post/${post.uid}`}>
      <Card key={post.uid} w="300px">
        <CardBody>
          <Stack>
            <Heading fontSize="2xl">{post.title}</Heading>
            <Text>{post.userName}</Text>
            <Text>{content}</Text>
            <Text>{post.createAt}</Text>
          </Stack>
        </CardBody>
      </Card>
    </Link>
  );
}

export default function View() {
  const { data } = useQuery(queryKeys.posts.list());
  return (
    <main>
      <Link href={"/post/write"} color="blue">
        Write
      </Link>
      <Flex
        gap="20px"
        alignItems="center"
        justifyContent="flex-start"
        flexWrap="wrap"
      >
        {data?.map((post) => <PostCard post={post} key={post.uid} />)}
      </Flex>
    </main>
  );
}
