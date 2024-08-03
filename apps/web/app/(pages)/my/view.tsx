"use client";

import styles from "./page.module.css";
import { Button } from "@ui/src/components/atom/Button";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "queryKeys";
import ProfileImage from "@ui/src/components/atom/ProfileImage";

export default function View() {
  const { data } = useQuery(queryKeys.profile.detail());

  return (
    <main className={styles.main}>
      <div className={styles.layout}>
        {data && (
          <div>
            {data.profileImage && (
              <ProfileImage src={data.profileImage} width={80} height={80} />
            )}
            <p>
              level: {data.level === 1 && "최고 관리자"}{" "}
              {data.level === 2 && "작가"} {data.level === 3 && "회원"}
            </p>
            <p>email: {data.email}</p>
            <p>username: {data.username}</p>
            <Button>작가 신청</Button>
          </div>
        )}
      </div>
    </main>
  );
}
