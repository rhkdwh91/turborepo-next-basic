import React, { ReactNode } from "react";
import { Box, Flex, Input, Text, Button } from "@chakra-ui/react";

interface CommentItemProps {
  children: ReactNode;
}

function CommentItem({ children }: CommentItemProps) {
  return <Text>{children}</Text>;
}

function CommentTextButton() {
  return (
    <Flex gap={4} marginBottom={4}>
      <Input type="text" placeholder="your comment here." />
      <Button>submit</Button>
    </Flex>
  );
}

interface CommentGroupProps {
  children: ReactNode;
}

function CommentBox({ children }: CommentGroupProps) {
  return <Box marginBottom={4}>{children}</Box>;
}

export default Object.assign(CommentBox, {
  CommentTextButton,
  CommentItem,
});
