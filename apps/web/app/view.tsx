"use client";

import { useCallback, useMemo } from "react";
import {
  Card,
  Flex,
  Stack,
  Heading,
  CardBody,
  Text,
  Button,
} from "@chakra-ui/react";

import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "queryKeys";
import Link from "next/link";
import { Post } from "types/post";
import styles from "./page.module.css";
import useUserInfo from "hooks/useUserInfo";
import LogoutButton from "components/ui/atom/LogoutButton";
import usePostMutation from "hooks/mutation/usePostMutation";

interface PostCardProps {
  post: Post;
  handleClickDeleteButton: (uid: number) => void;
}

function PostCard({ post, handleClickDeleteButton }: PostCardProps) {
  const { isLogin } = useUserInfo();
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
          {isLogin && (
            <Button
              onClick={(e) => {
                e.preventDefault();
                handleClickDeleteButton(post.uid);
              }}
            >
              Delete
            </Button>
          )}
        </CardBody>
      </Card>
    </Link>
  );
}

export default function View() {
  const { isLogin, userInfo } = useUserInfo();
  const { data, refetch } = useQuery(queryKeys.posts.list());
  const { deletePostMutation } = usePostMutation();

  const handleClickDeleteButton = useCallback((uid: number) => {
    if (
      !deletePostMutation.isPending &&
      confirm("Are you sure you want to delete this post?")
    ) {
      deletePostMutation.mutate(uid, {
        onSuccess: () => {
          refetch();
        },
      });
    }
  }, []);

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
              <Text textColor="white">Hello, {userInfo.username}!</Text>
              <LogoutButton />
            </>
          ) : (
            <>
              <Link href={"/sign-in"} className={styles.link}>
                SignIn
              </Link>
              <Text textColor="white">Hello, guest!</Text>
            </>
          )}
        </Flex>
        <Flex
          gap="20px"
          alignItems="center"
          justifyContent="flex-start"
          flexWrap="wrap"
        >
          {data?.map((post) => (
            <PostCard
              post={post}
              key={post.uid}
              handleClickDeleteButton={handleClickDeleteButton}
            />
          ))}
        </Flex>
      </div>
    </main>
  );
}
