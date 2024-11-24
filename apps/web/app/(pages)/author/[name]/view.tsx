"use client";

import { useAuthorQuery } from "hooks/service/queries/useAuthorQuery";
import { usePostListQuery } from "@/entities/post/model/usePostQuery";
import ProfileImage from "@repo/ui/components/atom/ProfileImage";

interface PostListProps {
  username: string;
}

function PostList({ username }: PostListProps) {
  const { data: postList } = usePostListQuery({ skip: 0, take: 100, username });
  return (
    <section className="my-20">
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        작가 포스트
      </h3>
      <div className="flex flex-wrap gap-10 mt-10">
        {postList?.map((post) => (
          <span className="scroll-m-20 text-xl font-semibold tracking-tight">
            {post.title}
          </span>
        ))}
      </div>
    </section>
  );
}

interface ViewProps {
  name: string;
}

export default function View({ name }: ViewProps) {
  const { data } = useAuthorQuery(name);
  return (
    <main className="min-h-screen max-w-6xl mx-auto">
      {data && (
        <>
          <article className="flex gap-10 items-center flex-nowrap mt-20">
            <ProfileImage
              height={70}
              width={70}
              src={data.profileImage ?? ""}
            />
            <h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-4xl">
              {data.username} 작가 프로필
            </h1>
          </article>
          <PostList username={data.username} />
        </>
      )}
    </main>
  );
}
