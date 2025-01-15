"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { Editor } from "kyz-editor";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { queryKeys } from "shared/lib/queryKeys";
import { useSession } from "next-auth/react";
import CommentGroup from "features/comment/ui/CommentGroup";
import { useDeletePostMutation } from "@/entities/post/model/usePostMutation";
import useCommentMutation from "@/features/comment/api/useCommentMutation";
import { Button } from "@repo/ui/components/atom/Button";
import { Badge } from "@repo/ui/components/atom/Badge";

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
    <main className="max-w-xl mx-auto">
      {isLoading && <div>로딩중</div>}
      {data && (
        <div>
          <div>
            <h1 className="text-white my-3">{data.title}</h1>
            <div className="flex gap-2 pb-4 mb-4 border-b border-gray-700">
              {data.tags?.map((tag) => (
                <Badge key={tag.name} variant="outline">
                  {tag.value}
                </Badge>
              ))}
            </div>
            <div className="flex items-center justify-between">
              <div className="flex gap-1 my-2 items-center">
                <ProfileImage src={data.user?.profileImage} />
                {data.user?.username}
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-right">
                  {dayjs(data.updateAt).format("YYYY-MM-DD hh:mm:ss")}
                </span>
                <span className="text-right">
                  {data.postView?.count ?? 0} Views
                </span>
              </div>
            </div>
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
                <span className="w-2/3 text-left px-4">{comment.content}</span>
                <div className="w-1/6 flex flex-col gap-4">
                  <span>{comment.createAt.split("T")[0]}</span>
                  {comment.user?.username === session?.user?.username && (
                    <Button
                      variant="outline"
                      onClick={() => handleClickDeleteComment(comment.uid)}
                    >
                      delete
                    </Button>
                  )}
                </div>
              </CommentGroup.CommentList.Item>
            ))
          ) : (
            <CommentGroup.CommentList.Item>
              There are no comments yet.
            </CommentGroup.CommentList.Item>
          )}
        </CommentGroup.CommentList>
      </CommentGroup>
      {session?.user?.level === 1 && (
        <div className="flex justify-end gap-4 pt-10">
          <Button variant="secondary" onClick={handleClickModify}>
            Modify
          </Button>
          <Button variant="destructive" onClick={handleClickDeleteButton}>
            Delete
          </Button>
        </div>
      )}
    </main>
  );
}

export default View;
