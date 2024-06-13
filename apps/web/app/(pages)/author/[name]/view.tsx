"use client";

import { useAuthorQuery } from "hooks/service/queries/useAuthorQuery";

interface ViewProps {
  name: string;
}

export default function View({ name }: ViewProps) {
  const { data } = useAuthorQuery(name);
  return (
    <main>
      {data && (
        <article>
          <h1>{data.username} 작가 프로필</h1>
          <img src={data.profileImage ?? ""} alt="profile image" />
        </article>
      )}
    </main>
  );
}
