"use client";

import styles from "./page.module.css";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "queryKeys";
import { redirect } from "next/navigation";
import TextEditor from "@/components/ui/organism/TextEditor";

interface ViewProps {
  uid: number;
}

export default function View({ uid }: ViewProps) {
  const { data } = useQuery({
    ...queryKeys.posts.detail(uid),
    staleTime: Infinity,
  });
  if (!data) {
    redirect("/");
  }

  return (
    <main className={styles.main}>
      <TextEditor uid={uid} data={data} />
    </main>
  );
}
