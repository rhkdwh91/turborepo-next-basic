"use client";
import { ReactNode } from "react";
import useUserVerifyCheck from "hooks/useUserVerifyCheck";
import { CircularProgress, Flex } from "@chakra-ui/react";

export default function VerifyCheckProvider({
  children,
}: {
  children: ReactNode;
}) {
  const { isHydration } = useUserVerifyCheck();
  return isHydration ? (
    children
  ) : (
    <Flex justifyContent="center" height="100vh" width="100%">
      <CircularProgress
        isIndeterminate
        color="blue"
        thickness="12px"
        position="absolute"
        top="50%"
        left="50%"
        transform={`translate(-50%, -50%)`}
      />
    </Flex>
  );
}
