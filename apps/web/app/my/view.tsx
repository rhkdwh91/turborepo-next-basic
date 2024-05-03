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
            <img src={userInfo.profileImage} alt="profile image" />
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
