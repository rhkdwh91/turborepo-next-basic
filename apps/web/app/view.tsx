/* eslint-disable jsx-a11y/no-onchange */
"use client";

import { Card, Flex, Stack, Heading, CardBody, Text } from "@chakra-ui/react";

import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../queryKeys";
import Link from "next/link";
import { Editor } from "kyz-editor";

export default function View() {
  const { data } = useQuery(queryKeys.posts.list());
  return (
    <main>
      <Link href={"/write"} color="blue">
        Write
      </Link>
      <Flex
        gap="20px"
        alignItems="center"
        justifyContent="flex-start"
        flexWrap="wrap"
      >
        {data?.map((post) => (
          <Card key={post.uid} w="300px">
            <CardBody>
              <Stack>
                <Heading>{post.title}</Heading>
                <Text>{post.userName}</Text>
                <Editor
                  placeholder={<></>}
                  editable={false}
                  onChange={() => null}
                  initialEditorState={post.content}
                ></Editor>
                <Text>{post.createAt}</Text>
              </Stack>
            </CardBody>
          </Card>
        ))}
      </Flex>
    </main>
  );
}
