import React, { ReactNode } from "react";

interface CommentItemProps {
  children: ReactNode;
}

function Item({ children }: CommentItemProps) {
  return (
    <div className="flex flex-wrap text-center border-b border-zinc-700 border-solid py-4 justify-start w-full items-center">
      {children}
    </div>
  );
}

interface CommentListProps {
  children: ReactNode;
}

function CommentList({ children }: CommentListProps) {
  return <div className="border-solid border-gray-200 w-full">{children}</div>;
}

export default Object.assign(CommentList, {
  Item,
});
