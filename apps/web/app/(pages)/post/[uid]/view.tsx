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
import { useSession } from "next-auth/react";
import CommentGroup from "components/ui/organism/CommentGroup";
import { useDeletePostMutation } from "hooks/service/mutations/usePostMutation";
import useCommentMutation from "hooks/service/mutations/useCommentMutation";

import { confirmModal } from "@repo/ui/components/organism/ConfirmModal";
import ProfileImage from "@ui/src/components/atom/ProfileImage";

interface ViewProps {
  uid: number;
}

function View({ uid }: ViewProps) {
  const router = useRouter();
  const { data: session } = useSession();
  const { data, isLoading } = useQuery(queryKeys.posts.detail(uid));
  const { deleteCommentMutation } = useCommentMutation();
  const deletePostMutation = useDeletePostMutation();

  const handleClickModify = useCallback(() => {
    router.push(`/post/modify/${uid}`);
  }, []);

  const handleClickDeleteComment = useCallback(
    (commentNumber: number) => {
      confirmModal.open({
        message: "Are you sure you want to delete this comment?",
        onClickConfirm: () => {
          if (!deleteCommentMutation.isPending) {
            deleteCommentMutation.mutate(commentNumber);
          }
        },
      });
    },
    [deleteCommentMutation.isPending],
  );

  const handleClickDeleteButton = useCallback(() => {
    confirmModal.open({
      message: "Are you sure you want to delete this post?",
      onClickConfirm: () => {
        if (!deletePostMutation.isPending) {
          deletePostMutation.mutate(uid);
        }
      },
    });
  }, [deletePostMutation.isPending]);

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
            <Heading fontSize="3xl" paddingY="2">
              {data.title}
            </Heading>
            <Box
              display="flex"
              justifyContent="flex-start"
              alignItems="center"
              flexWrap="wrap"
              gap={2}
            >
              {data.tags?.map((tag) => <Tag key={tag.name}>{tag.value}</Tag>)}
            </Box>
            <Text paddingX="2">{data.username}</Text>
            <Text paddingX="2">{data.updateAt}</Text>
            <Divider padding={2} borderColor={"black"} width="inherit" />
          </Stack>

          <Editor editable={false} initialEditorState={data.content} />
        </Box>
      )}
      <CommentGroup>
        <CommentGroup.CommentTextButton />
        <CommentGroup.CommentList>
          {data && data.comments.length > 0 ? (
            data.comments.map((comment) => (
              <CommentGroup.CommentList.Item key={comment.uid}>
                <div className="flex items-center">
                  {comment.user?.profileImage && (
                    <ProfileImage src={comment.user?.profileImage} />
                  )}
                  <Text>{comment.user?.username}</Text>
                </div>
                <Text>{comment.content}</Text>
                <Text>{comment.createAt.split("T")[0]}</Text>
                {comment.user?.username === session?.user?.username && (
                  <button onClick={() => handleClickDeleteComment(comment.uid)}>
                    delete
                  </button>
                )}
              </CommentGroup.CommentList.Item>
            ))
          ) : (
            <CommentGroup.CommentList.Item>
              There are no comments yet.
            </CommentGroup.CommentList.Item>
          )}
        </CommentGroup.CommentList>
      </CommentGroup>
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
