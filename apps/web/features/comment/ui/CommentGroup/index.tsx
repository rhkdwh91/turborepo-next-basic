import React, { ReactNode } from "react";
import CommentTextButton from "features/comment/ui/CommentTextButton";
import CommentList from "features/comment/ui/CommentList";

interface CommentGroupProps {
  children: ReactNode;
}

function CommentGroup({ children }: CommentGroupProps) {
  return <div className="mb-4">{children}</div>;
}

export default Object.assign(CommentGroup, {
  CommentTextButton,
  CommentList,
});
