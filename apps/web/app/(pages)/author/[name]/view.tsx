"use client";

import { useAuthorQuery } from "hooks/service/queries/useAuthorQuery";
import { usePostListQuery } from "hooks/service/queries/usePostQuery";

interface PostListProps {
  username: string;
}

function PostList({ username }: PostListProps) {
  const { data: postList } = usePostListQuery({ skip: 0, take: 100, username });
  return <section>{postList?.map((post) => <div>{post.title}</div>)}</section>;
}

interface ViewProps {
  name: string;
}

export default function View({ name }: ViewProps) {
  const { data } = useAuthorQuery(name);
  return (
    <main>
      {data && (
        <>
          <article>
            <h1>{data.username} 작가 프로필</h1>
            <img src={data.profileImage ?? ""} alt="profile image" />
          </article>
          <PostList username={data.username} />
        </>
      )}
    </main>
  );
}
