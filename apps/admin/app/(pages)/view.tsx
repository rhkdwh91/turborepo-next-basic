"use client";

import Link from "next/link";

export default function View() {
  return (
    <main className="px-2.5 py-10 max-w-6xl lg:max-w-6xl mx-auto">
      <h1 className="text-5xl font-bold pb-3">Admin</h1>
      <Link
        className="text-xl block text-blue-700 hover:font-bold hover:text-blue-800"
        href="/user"
      >
        계정 관리
      </Link>
      <Link
        className="text-xl block text-blue-700 hover:font-bold hover:text-blue-800"
        href="/category-tag"
      >
        카테고리/태그 관리
      </Link>
      <Link
        className="text-xl block text-blue-700 hover:font-bold hover:text-blue-800"
        href="/application-writer"
      >
        작가신청 관리
      </Link>
    </main>
  );
}
