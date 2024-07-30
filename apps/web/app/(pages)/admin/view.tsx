"use client";
import Link from "next/link";

export default function View() {
  return (
    <main className="px-2.5">
      <h1 className="text-5xl font-bold pb-3">Admin</h1>
      <Link href="/admin/user">계정 관리</Link>
      <Link href="/admin/category-tag">카테고리/태그 관리</Link>
      <Link href="/admin/application-writer">작가신청 관리</Link>
    </main>
  );
}
