"use client";

interface ViewProps {
  name: string;
}

export default function View({ name }: ViewProps) {
  return (
    <main>
      <h1>{name} 작가 프로필</h1>
    </main>
  );
}
