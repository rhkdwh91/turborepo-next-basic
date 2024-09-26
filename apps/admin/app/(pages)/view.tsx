"use client";

import Link from "next/link";

export default function View() {
  return (
    <main className="px-2.5 py-10 max-w-6xl lg:max-w-6xl mx-auto flex flex-col gap-4">
      <Link
        className="text-2xl block hover:font-bold hover:text-gray-400"
        href="/user"
      >
        계정 관리
      </Link>
      <Link
        className="text-2xl block hover:font-bold hover:text-gray-400"
        href="/category-tag"
      >
        카테고리/태그 관리
      </Link>
      <Link
        className="text-2xl block hover:font-bold hover:text-gray-400"
        href="/application-writer"
      >
        작가신청 관리
      </Link>
    </main>
  );
}
