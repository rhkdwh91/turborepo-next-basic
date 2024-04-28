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
  Skeleton,
  Button,
  Flex,
} from "@chakra-ui/react";
import styles from "./page.module.css";
import useUserInfo from "hooks/useUserInfo";
import usePostMutation from "hooks/mutation/usePostMutation";

interface ViewProps {
  uid: number;
}

function View({ uid }: ViewProps) {
  const router = useRouter();
  const { isLogin } = useUserInfo();
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
      <Skeleton isLoaded={!isLoading}>
        {data && (
          <Box position="relative" paddingY="10">
            <Stack paddingY="2">
              <Heading fontSize="3xl" padding="2">
                {data.title}
              </Heading>
              <Text paddingX="2">{data.tag}</Text>
              <Text paddingX="2">{data.userName}</Text>
              <Text paddingX="2">{data.updateAt}</Text>
              <Divider padding={2} borderColor={"black"} />
            </Stack>

            <Editor editable={false} initialEditorState={data.content} />
          </Box>
        )}
        {isLogin && (
          <Flex gap={2}>
            <Button onClick={handleClickModify}>Modify</Button>
            <Button onClick={handleClickDeleteButton}>Delete</Button>
          </Flex>
        )}
      </Skeleton>
    </main>
  );
}

export default View;
