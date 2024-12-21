"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "shared/lib/queryKeys";
import Link from "next/link";
import dayjs from "dayjs";

export default function View() {
  const { data: applications } = useQuery(queryKeys.writerApplication.list());

  return (
    <main className="px-2.5 py-10 max-w-6xl lg:max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold">작가 신청 관리</h2>
      {applications &&
        applications.map((application) => (
          <Link
            key={application.uid}
            className="my-8 border-t border-b py-4 flex flex-col gap-2"
            href={`/admin/application-writer/${application.user.uid}`}
          >
            <p>{application.user.username}</p>
            <p>
              {application.user.level === 1 && "admin"}
              {application.user.level === 2 && "writer"}
              {application.user.level === 3 && "user"}
            </p>
            <p>{dayjs(application.createAt).format("YYYY-MM-DD hh:mm:ss")}</p>
          </Link>
        ))}
    </main>
  );
}
