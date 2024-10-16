"use client";

import Link from "next/link";
import LogoutButton from "@/components/atoms/LogoutButton";
import { useSession } from "next-auth/react";
import { Session } from "next-auth";

interface HeaderProps {
  session?: Session | null;
}

export default function Header({ session }: HeaderProps) {
  const { data, status } = useSession();
  return (status !== "loading" ? data : session) ? (
    <header className="px-2.5 py-10 max-w-6xl lg:max-w-6xl mx-auto flex justify-between">
      <Link href="/" className="font-bold text-2xl">
        KLOG ADMIN
      </Link>
      <LogoutButton />
    </header>
  ) : null;
}
