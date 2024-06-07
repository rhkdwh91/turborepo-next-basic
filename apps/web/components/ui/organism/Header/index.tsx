"use client";

import { Box, Flex } from "@chakra-ui/react";
import Link from "next/link";
import styles from "./styles.module.css";
import LogoutButton from "components/ui/atom/LogoutButton";
import { useSession } from "next-auth/react";
import { Session } from "next-auth";

interface HeaderProps {
  session?: Session | null;
}

export default function Header({ session }: HeaderProps) {
  const { data, status } = useSession();
  return (
    <Box bg="black">
      <Box
        color="white"
        display={"flex"}
        maxWidth={{ md: "100%", xl: 1160 }}
        justifyContent="space-between"
        alignItems="center"
        flexWrap={"wrap"}
        margin={"0 auto 30px auto"}
        gap={4}
        boxSize={"border-box"}
        padding={4}
      >
        <Link href={"/"}>
          <img
            width={120}
            height={30}
            src="https://bucket-9gqcvu.s3.ap-northeast-2.amazonaws.com/klog/logo_simple.png"
            alt={"logo"}
          />
        </Link>
        <Flex alignItems={"center"} gap={"4"}>
          {(status !== "loading" ? data : session) ? (
            <>
              <Link href={"/post/write"} className={styles.link}>
                Write
              </Link>
              <Link href={"/my"} className={styles.link}>
                My
              </Link>
              {data?.user?.level === 0 && (
                <Link href={"/admin"} className={styles.link}>
                  Admin
                </Link>
              )}
              <LogoutButton />
            </>
          ) : (
            <>
              <Link href={"/sign-in"} className={styles.link}>
                SignIn
              </Link>
            </>
          )}
        </Flex>
      </Box>
    </Box>
  );
}
