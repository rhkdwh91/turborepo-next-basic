"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { Editor } from "kyz-editor";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { queryKeys } from "queryKeys";
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
      {isLoading && <div>로딩중</div>}
      {data && (
        <div>
          <div>
            <h1 className="text-white my-3">{data.title}</h1>
            <div className="flex gap-2">
              {data.tags?.map((tag) => <span key={tag.name}>{tag.value}</span>)}
            </div>
            <div className="flex gap-1 my-2 items-center">
              <ProfileImage src={data.user?.profileImage} />
              {data.user?.username}
            </div>
            <span className="mr-2">{data.postView?.count ?? 0} Views</span>
            <span>
              uploadAt, {dayjs(data.updateAt).format("YYYY-MM-DD hh:mm:ss")}
            </span>
          </div>

          <Editor editable={false} initialEditorState={data.content} />
        </div>
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
                  <span>{comment.user?.username}</span>
                </div>
                <span>{comment.content}</span>
                <span>{comment.createAt.split("T")[0]}</span>
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
      {session?.user?.level === 0 && (
        <div className="flex gap-1">
          <button onClick={handleClickModify}>Modify</button>
          <button onClick={handleClickDeleteButton}>Delete</button>
        </div>
      )}
    </main>
  );
}

export default View;
