import { Box, Flex } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import styles from "./styles.module.css";
import LogoutButton from "components/ui/atom/LogoutButton";
import { getServerSession } from "next-auth";
import authOptions from "auth.config";

export default async function Header() {
  const session = await getServerSession(authOptions);
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
          <Image width={120} height={30} src={"/logo.png"} alt={"logo"} />
        </Link>
        <Flex alignItems={"center"} gap={"4"}>
          {session ? (
            <>
              <Link href={"/post/write"} className={styles.link}>
                Write
              </Link>
              <Link href={"/my"} className={styles.link}>
                My
              </Link>
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
