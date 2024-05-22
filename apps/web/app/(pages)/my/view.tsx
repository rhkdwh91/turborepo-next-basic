"use client";

import styles from "./page.module.css";
import { Box, Text } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "queryKeys";

export default function View() {
  const { data } = useQuery(queryKeys.profile.detail());

  return (
    <main className={styles.main}>
      <div className={styles.layout}>
        {data && (
          <Box>
            {data.profileImage && (
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
                  src={data.profileImage}
                  alt="profile image"
                  width={50}
                  height={50}
                />
              </Box>
            )}
            <Text>
              level: {data.level === 0 && "최고 관리자"}{" "}
              {data.level === 1 && "관리자"} {data.level === 2 && "회원"}
            </Text>
            <Text>email: {data.email}</Text>
            <Text>username: {data.username}</Text>
          </Box>
        )}
      </div>
    </main>
  );
}
