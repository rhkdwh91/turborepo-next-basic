"use client";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/queryKeys";

export default function View() {
  const { data: tags } = useQuery({ ...queryKeys.tags.list() });
  return (
    <main className="px-2.5">
      <h1 className="text-5xl font-bold pb-3">Admin</h1>
      <section className="my-3">
        <h2 className="text-2xl font-bold">계정 관리</h2>
      </section>
      <section className="my-3">
        <h2 className="text-2xl font-bold">태그 관리</h2>
        <article className="my-3">
          {tags?.map((tag) => (
            <div
              key={tag.value}
              className="m-2 border-2 border-blue-400 bg-blue-600 p-2 inline-block rounded-full text-amber-50"
            >
              {tag.name} <button>제거</button>
            </div>
          ))}
        </article>
      </section>
    </main>
  );
}
