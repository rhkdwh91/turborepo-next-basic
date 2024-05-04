"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { Editor } from "kyz-editor";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "queryKeys";
import {
  Divider,
  Box,
  Text,
  Heading,
  Stack,
  Button,
  Flex,
  CircularProgress,
  Tag,
} from "@chakra-ui/react";
import styles from "./page.module.css";
import usePostMutation from "hooks/mutation/usePostMutation";
import { useSession } from "next-auth/react";

interface ViewProps {
  uid: number;
}

function View({ uid }: ViewProps) {
  const router = useRouter();
  const { data: session } = useSession();
  const { data, isLoading } = useQuery(queryKeys.posts.detail(uid));
  const { deletePostMutation } = usePostMutation();

  const handleClickModify = useCallback(() => {
    router.push(`/post/modify/${uid}`);
  }, []);

  const handleClickDeleteButton = useCallback(() => {
    if (
      !deletePostMutation.isPending &&
      confirm("Are you sure you want to delete this post?")
    ) {
      deletePostMutation.mutate(uid);
    }
  }, []);

  return (
    <main className={styles.layout}>
      {isLoading && (
        <Flex justifyContent="center" height="100vh" width="100%">
          <CircularProgress
            isIndeterminate
            color="blue"
            thickness="12px"
            position="absolute"
            top="50%"
            left="50%"
            transform={`translate(-50%, -50%)`}
          />
        </Flex>
      )}
      {data && (
        <Box position="relative" paddingY="10">
          <Stack paddingY="2">
            <Heading fontSize="3xl" padding="2">
              {data.title}
            </Heading>
            <Text paddingX="2">
              {data.tags.split(",").map((tag) => (
                <Tag key="tag">{tag}</Tag>
              ))}
            </Text>
            <Text paddingX="2">{data.username}</Text>
            <Text paddingX="2">{data.updateAt}</Text>
            <Divider padding={2} borderColor={"black"} width="inherit" />
          </Stack>

          <Editor editable={false} initialEditorState={data.content} />
        </Box>
      )}
      {session && (
        <Flex gap={2}>
          <Button onClick={handleClickModify}>Modify</Button>
          <Button onClick={handleClickDeleteButton}>Delete</Button>
        </Flex>
      )}
    </main>
  );
}

export default View;
