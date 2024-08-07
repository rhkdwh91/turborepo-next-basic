"use client";

import Link from "next/link";
import LogoutButton from "components/ui/atom/LogoutButton";
import { useSession } from "next-auth/react";
import { Session } from "next-auth";

interface HeaderProps {
  session?: Session | null;
}

export default function Header({ session }: HeaderProps) {
  const { data, status } = useSession();
  return (
    <div className="bg-black text-white">
      <div className="flex items-center justify-between max-w-6xl mx-auto py-10">
        <Link href={"/"} className="flux text-4xl">
          KLOG
        </Link>
        <div>
          {(status !== "loading" ? data : session) ? (
            <>
              <Link href={"/my"} className="p-2 editor-text-underline">
                My
              </Link>
              {data?.user?.level && data.user.level === 3 && (
                <Link
                  href={"/application"}
                  className="p-2 editor-text-underline"
                >
                  Application
                </Link>
              )}
              {data?.user?.level && data.user.level <= 2 && (
                <Link
                  href={"/post/write"}
                  className="p-2 editor-text-underline"
                >
                  Write
                </Link>
              )}
              {data?.user?.level && data.user.level <= 1 && (
                <Link href={"/admin"} className="p-2 editor-text-underline">
                  Admin
                </Link>
              )}
              <LogoutButton />
            </>
          ) : (
            <Link href={"/sign-in"} className="neon  text-3xl">
              SignIn
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
