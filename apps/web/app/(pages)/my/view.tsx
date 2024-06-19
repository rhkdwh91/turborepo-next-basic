"use client";

import styles from "./page.module.css";
import { Box, Button, Text } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "queryKeys";
import ProfileImage from "@ui/src/components/atom/ProfileImage";

export default function View() {
  const { data } = useQuery(queryKeys.profile.detail());

  return (
    <main className={styles.main}>
      <div className={styles.layout}>
        {data && (
          <Box>
            {data.profileImage && (
              <ProfileImage src={data.profileImage} width={80} height={80} />
            )}
            <Text>
              level: {data.level === 1 && "최고 관리자"}{" "}
              {data.level === 2 && "작가"} {data.level === 3 && "회원"}
            </Text>
            <Text>email: {data.email}</Text>
            <Text>username: {data.username}</Text>
            <Button>작가 신청</Button>
          </Box>
        )}
      </div>
    </main>
  );
}
