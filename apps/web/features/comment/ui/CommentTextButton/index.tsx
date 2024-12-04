import { Button } from "@ui/src/components/atom/Button";
import { Input } from "@ui/src/components/atom/Input";
import React, { ChangeEvent, useState, memo } from "react";
import useCommentMutation from "@/features/comment/api/useCommentMutation";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";

export default memo(function CommentTextButton() {
  const { data: session } = useSession();
  const { uid } = useParams();
  const [comment, setComment] = useState("");
  const { createCommentMutation } = useCommentMutation();
  const handleChangeComment = (e: ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };
  const handleClickSubmit = () => {
    if (!createCommentMutation.isPending && session?.user) {
      createCommentMutation.mutate(
        {
          postUid: Number(uid),
          content: comment,
        },
        {
          onSuccess: () => {
            setComment("");
          },
        },
      );
    }
  };
  return (
    <div className="flex gap-4">
      <Input
        type="text"
        placeholder="your comment here."
        value={comment}
        onChange={handleChangeComment}
      />
      <Button variant="default" onClick={handleClickSubmit}>
        submit
      </Button>
    </div>
  );
});
