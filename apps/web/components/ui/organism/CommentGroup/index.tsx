import React, { ReactNode } from "react";
import CommentTextButton from "components/ui/molecule/CommentTextButton";
import CommentList from "components/ui/molecule/CommentList";

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
