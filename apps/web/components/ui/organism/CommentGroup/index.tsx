import React, { ReactNode } from "react";
import { Box } from "@chakra-ui/react";

import CommentTextButton from "components/ui/molecule/CommentTextButton";
import CommentList from "components/ui/molecule/CommentList";

interface CommentGroupProps {
  children: ReactNode;
}

function CommentGroup({ children }: CommentGroupProps) {
  return <Box marginBottom={4}>{children}</Box>;
}

export default Object.assign(CommentGroup, {
  CommentTextButton,
  CommentList,
});
