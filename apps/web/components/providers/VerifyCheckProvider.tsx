"use client";
import useUserVerifyCheck from "hooks/useUserVerifyCheck";

export default function VerifyCheckProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useUserVerifyCheck();
  return <>{children}</>;
}
