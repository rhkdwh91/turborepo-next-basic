"use client";

import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "queryKeys";
import ProfileImage from "@ui/src/components/atom/ProfileImage";

export default function View() {
  const { data } = useQuery(queryKeys.profile.detail());

  return (
    <main className="max-w-6xl mx-auto min-h-screen">
      <div className="pt-10">
        <h1 className="text-3xl font-semibold pb-4">내 정보</h1>
        {data && (
          <div className="flex gap-2 pb-4 mb-4 border-b border-gray-700">
            {data.profileImage && (
              <ProfileImage src={data.profileImage} width={80} height={80} />
            )}
            <div>
              <p>
                level: {data.level === 1 && "최고 관리자"}{" "}
                {data.level === 2 && "작가"} {data.level === 3 && "회원"}
              </p>
              <p>email: {data.email}</p>
              <p>username: {data.username}</p>
            </div>
          </div>
        )}
        <h2 className="text-2xl font-semibold pb-4">내 포스트</h2>
      </div>
    </main>
  );
}
