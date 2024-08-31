"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "queryKeys";
import {
  useAcceptingWriterApplication,
  useAcceptWriterApplication,
  useRejectWriterApplication,
} from "@/hooks/service/mutations/useWriterApplication";
import { Button } from "@ui/src/components/atom/Button";

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
    <main className="px-2.5 py-10 max-w-6xl lg:max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold">작가 신청 관리</h2>
      {applications &&
        applications.map((application) => (
          <div
            key={application.uid}
            className="my-8 border-t border-b py-4 flex flex-col gap-2"
          >
            <p>{application.user.username}</p>
            <p>{application.updateAt}</p>
            {application.status === "RECEIPT" && (
              <div className="flex justify-between">
                <p>상태: 신청접수</p>
                <div className="flex gap-4">
                  <Button
                    onClick={() => handleClickAccepting(application.user.uid)}
                  >
                    승인 평가
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() =>
                      handleClickReject(application.user.uid, "승인 거절")
                    }
                  >
                    승인 거절
                  </Button>
                </div>
              </div>
            )}
            {application.status === "REJECT" && <p>승인거절</p>}
            {application.status === "ACCEPTING" && (
              <div className="flex justify-between">
                <p>승인평가</p>
                <div className="flex gap-4">
                  <Button
                    onClick={() => handleClickAccept(application.user.uid)}
                  >
                    승인
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() =>
                      handleClickReject(application.user.uid, "승인 거절")
                    }
                  >
                    승인 거절
                  </Button>
                </div>
              </div>
            )}
            {application.status === "ACCEPT" && <p>승인</p>}
          </div>
        ))}
    </main>
  );
}
