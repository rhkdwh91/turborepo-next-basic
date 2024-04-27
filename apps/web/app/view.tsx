"use client";

import { useMemo } from "react";
import { Card, Flex, Stack, Heading, CardBody, Text } from "@chakra-ui/react";

import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../queryKeys";
import Link from "next/link";
import { Post } from "../types/post";
import styles from "./page.module.css";
import useUserInfo from "../hooks/useUserInfo";

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
  const { isLogin, userInfo } = useUserInfo();
  return (
    <main className={styles.main}>
      <div className={styles.layout}>
        <Flex
          gap="20px"
          alignItems="center"
          justifyContent="flex-start"
          flexWrap="wrap"
        >
          {isLogin ? (
            <Link href={"/post/write"} className={styles.link}>
              Write
            </Link>
          ) : (
            <Link href={"/sign-in"} className={styles.link}>
              SignIn
            </Link>
          )}
          {userInfo && (
            <Text textColor="white">Hello, {userInfo.username}!</Text>
          )}
        </Flex>
        <Flex
          gap="20px"
          alignItems="center"
          justifyContent="flex-start"
          flexWrap="wrap"
        >
          {data?.map((post) => <PostCard post={post} key={post.uid} />)}
        </Flex>
      </div>
    </main>
  );
}
