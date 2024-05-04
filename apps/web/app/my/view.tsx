"use client";

import styles from "./page.module.css";
import { Box, Text } from "@chakra-ui/react";
import { User } from "types/user";

interface ViewProps {
  user?: User;
}

export default function View({ user }: ViewProps) {
  return (
    <main className={styles.main}>
      <div className={styles.layout}>
        {user && (
          <Box>
            {user.profileImage && (
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
                  src={user.profileImage}
                  alt="profile image"
                  width={50}
                  height={50}
                />
              </Box>
            )}
            <Text>
              level: {user.level === 0 && "최고 관리자"}{" "}
              {user.level === 1 && "관리자"} {user.level === 2 && "회원"}
            </Text>
            <Text>email: {user.email}</Text>
            <Text>username: {user.username}</Text>
          </Box>
        )}
      </div>
    </main>
  );
}
