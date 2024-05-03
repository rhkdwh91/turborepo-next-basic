"use client";

import styles from "./page.module.css";
import useUserInfo from "hooks/useUserInfo";
import { Box, Text } from "@chakra-ui/react";

export default function View() {
  const { userInfo } = useUserInfo();

  return (
    <main className={styles.main}>
      <div className={styles.layout}>
        <Box>
          {userInfo.profileImage && (
            <Box
              borderRadius="100%"
              border="solid 1px #000"
              width={100}
              height={100}
              overflow={"hidden"}
              margin={"0 auto 20px auto"}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <img
                src={userInfo.profileImage}
                alt="profile image"
                width={50}
                height={50}
              />
            </Box>
          )}
          <Text>
            level: {userInfo.level === 0 && "최고 관리자"}{" "}
            {userInfo.level === 1 && "관리자"} {userInfo.level === 2 && "회원"}
          </Text>
          <Text>email: {userInfo.email}</Text>
          <Text>username: {userInfo.username}</Text>
        </Box>
      </div>
    </main>
  );
}
