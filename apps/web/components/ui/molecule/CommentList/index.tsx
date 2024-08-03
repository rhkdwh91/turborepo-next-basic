import React, { ReactNode } from "react";

interface CommentItemProps {
  children: ReactNode;
}

function Item({ children }: CommentItemProps) {
  return (
    <div className="flex flex-wrap space-between text-center border-solid border-gray-200 p-20">
      {children}
    </div>
  );
}

interface CommentListProps {
  children: ReactNode;
}

function CommentList({ children }: CommentListProps) {
  return <div className="border-solid border-gray-200">{children}</div>;
}

export default Object.assign(CommentList, {
  Item,
});
