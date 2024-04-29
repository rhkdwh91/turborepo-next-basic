"use client";

import { useMemo } from "react";
import {
  Card,
  Flex,
  Stack,
  Heading,
  CardBody,
  Text,
  Box,
} from "@chakra-ui/react";

import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "queryKeys";
import Link from "next/link";
import { Post } from "types/post";
import styles from "./page.module.css";
import useUserInfo from "hooks/useUserInfo";
import LogoutButton from "components/ui/atom/LogoutButton";

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
          xl: "300px",
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
            <Text>{post.userName}</Text>
            <Text>{content}</Text>
            <Text>createdAt {createAt}</Text>
          </Stack>
        </CardBody>
      </Card>
    </Link>
  );
}

export default function View() {
  const { isLogin, userInfo } = useUserInfo();
  const { data } = useQuery(queryKeys.posts.list());

  return (
    <main className={styles.main}>
      <div className={styles.layout}>
        <Flex
          gap="20px"
          alignItems="center"
          justifyContent="flex-start"
          flexWrap="wrap"
          paddingY={4}
        >
          {isLogin ? (
            <>
              <Link href={"/post/write"} className={styles.link}>
                Write
              </Link>
              <Text>Hello, {userInfo.username}!</Text>
              <LogoutButton />
            </>
          ) : (
            <>
              <Link href={"/sign-in"} className={styles.link}>
                SignIn
              </Link>
              <Text>Hello, guest!</Text>
            </>
          )}
        </Flex>
        <Box display={{ md: "block", xl: "flex" }} flexWrap={"wrap"} gap={4}>
          {data?.map((post) => <PostCard post={post} key={post.uid} />)}
        </Box>
      </div>
    </main>
  );
}
