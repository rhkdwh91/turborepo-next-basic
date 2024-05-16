import React, { ReactNode } from "react";
import { Box } from "@chakra-ui/react";

interface CommentItemProps {
  children: ReactNode;
}

function Item({ children }: CommentItemProps) {
  return (
    <Box
      display="flex"
      flexWrap={"wrap"}
      justifyContent="space-between"
      alignItems="center"
      borderBottom="solid 1px #ddd"
      padding="20px 0"
    >
      {children}
    </Box>
  );
}

interface CommentListProps {
  children: ReactNode;
}

function CommentList({ children }: CommentListProps) {
  return (
    <Box borderTop="solid 1px #ddd" marginY={10}>
      {children}
    </Box>
  );
}

export default Object.assign(CommentList, {
  Item,
});
