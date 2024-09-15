"use client";

import { useSession } from "next-auth/react";
import ProfileImage from "@ui/src/components/atom/ProfileImage";
import { usePostListQuery } from "@/hooks/service/queries/usePostQuery";

export default function View() {
  const { data } = useSession();
  const { data: postList } = usePostListQuery({
    skip: 0,
    take: 100,
    username: data?.user?.username,
  });

  return (
    <main className="max-w-6xl mx-auto min-h-screen">
      <div className="pt-20">
        <h1 className="text-3xl font-semibold pb-10">내 정보</h1>
        {data?.user && (
          <div className="flex gap-2 pb-10 mb-4 border-b border-gray-700">
            {data.user.profileImage && (
              <ProfileImage
                src={data.user.profileImage}
                width={80}
                height={80}
              />
            )}
            <div>
              <p>
                회원 등급: {data.user.level === 1 && "최고 관리자"}{" "}
                {data.user.level === 2 && "작가"}{" "}
                {data.user.level === 3 && "회원"}
              </p>
              {data.user.email && <p>email: {data.user.email}</p>}
              <p>username: {data.user.username}</p>
            </div>
          </div>
        )}
        {postList && postList.length > 0 && (
          <section className="mt-10">
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
              내 포스트
            </h3>
            <div className="flex flex-wrap gap-10 mt-10">
              {postList?.map((post) => (
                <span className="scroll-m-20 text-xl font-semibold tracking-tight">
                  {post.title}
                </span>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
