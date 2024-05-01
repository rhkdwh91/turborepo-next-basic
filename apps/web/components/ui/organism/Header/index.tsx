"use client";

import { Box, Text } from "@chakra-ui/react";
import Link from "next/link";
import styles from "./styles.module.css";
import LogoutButton from "components/ui/atom/LogoutButton";
import useUserInfo from "hooks/useUserInfo";

export default function Header() {
  const { isLogin, userInfo } = useUserInfo();
  return (
    <Box bg="tomato">
      <Box
        color="white"
        display={"flex"}
        maxWidth={{ md: "100%", xl: 1160 }}
        justifyContent="flex-end"
        alignItems="center"
        flexWrap={"wrap"}
        margin={"0 auto 30px auto"}
        gap={4}
        boxSize={"border-box"}
        padding={4}
      >
        {isLogin ? (
          <>
            <Link href={"/post/write"} className={styles.link}>
              Write
            </Link>
            <Text>Hello, {userInfo.username}!</Text>
            <LogoutButton />
          </>
        ) : (
          <>
            <Link href={"/sign-in"} className={styles.link}>
              SignIn
            </Link>
            <Text>Hello, guest!</Text>
          </>
        )}
      </Box>
    </Box>
  );
}
