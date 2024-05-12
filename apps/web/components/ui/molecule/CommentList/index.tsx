import React, { ReactNode } from "react";
import { Box, Text } from "@chakra-ui/react";

interface CommentItemProps {
  children: ReactNode;
}

function Item({ children }: CommentItemProps) {
  return <Text>{children}</Text>;
}

interface CommentListProps {
  children: ReactNode;
}

function CommentList({ children }: CommentListProps) {
  return <Box>{children}</Box>;
}

export default Object.assign(CommentList, {
  Item,
});
