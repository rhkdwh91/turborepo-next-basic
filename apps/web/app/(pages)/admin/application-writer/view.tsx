"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "queryKeys";
import {
  useAcceptingWriterApplication,
  useAcceptWriterApplication,
  useRejectWriterApplication,
} from "@/hooks/service/mutations/useWriterApplication";

export default function View() {
  const { data: applications, refetch } = useQuery(
    queryKeys.writerApplication.list(),
  );
  const acceptingWriterApplication = useAcceptingWriterApplication();
  const rejectWriterApplication = useRejectWriterApplication();
  const acceptWriterApplication = useAcceptWriterApplication();

  const handleClickAccepting = (userUid: number) => {
    acceptingWriterApplication.mutate(
      { userUid, content: "" },
      {
        onSuccess: async () => {
          await refetch();
        },
      },
    );
  };

  const handleClickReject = (userUid: number, content: string) => {
    rejectWriterApplication.mutate(
      { userUid, content },
      {
        onSuccess: async () => {
          await refetch();
        },
      },
    );
  };

  const handleClickAccept = (userUid: number) => {
    acceptWriterApplication.mutate(
      { userUid, content: "" },
      {
        onSuccess: async () => {
          await refetch();
        },
      },
    );
  };

  return (
    <section className="my-4">
      <h2 className="text-2xl font-bold">작가 신청 관리</h2>
      {applications &&
        applications.map((application) => (
          <div key={application.uid}>
            <p>{application.user.username}</p>
            <p>{application.updateAt}</p>
            {application.status === "RECEIPT" && (
              <div>
                <p>상태: 신청접수</p>
                <button
                  className="border-2 py-1 px-4 rounded-full bg-amber-200 my-2"
                  onClick={() => handleClickAccepting(application.user.uid)}
                >
                  승인 평가
                </button>
                <button
                  className="border-2 py-1 px-4 rounded-full bg-amber-200 my-2"
                  onClick={() =>
                    handleClickReject(application.user.uid, "승인 거절")
                  }
                >
                  승인 거절
                </button>
              </div>
            )}
            {application.status === "REJECT" && <p>승인거절</p>}
            {application.status === "ACCEPTING" && (
              <div>
                <p>승인평가</p>
                <button
                  className="border-2 py-1 px-4 rounded-full bg-amber-200 my-2"
                  onClick={() => handleClickAccept(application.user.uid)}
                >
                  승인
                </button>
                <button
                  className="border-2 py-1 px-4 rounded-full bg-amber-200 my-2"
                  onClick={() =>
                    handleClickReject(application.user.uid, "승인 거절")
                  }
                >
                  승인 거절
                </button>
              </div>
            )}
            {application.status === "ACCEPT" && <p>승인</p>}
          </div>
        ))}
    </section>
  );
}
