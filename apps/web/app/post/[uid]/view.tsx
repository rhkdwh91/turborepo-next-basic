"use client";

import { Editor } from "kyz-editor";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "queryKeys";
import { Divider, Box, Text, Heading, Stack, Skeleton } from "@chakra-ui/react";
import styles from "./page.module.css";

interface ViewProps {
  uid: number;
}

function View({ uid }: ViewProps) {
  const { data, isLoading } = useQuery(queryKeys.posts.detail(uid));
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
      </Skeleton>
    </main>
  );
}

export default View;
