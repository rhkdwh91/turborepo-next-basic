"use client";

import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "queryKeys";
import { redirect } from "next/navigation";
import LexicalEditor from "@/entities/post/ui/LexicalEditor";

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
    <main>
      <LexicalEditor uid={uid} data={data} />
    </main>
  );
}
