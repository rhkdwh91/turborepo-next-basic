"use client";

import dayjs from "dayjs";
import { Button } from "@ui/src/components/atom/Button";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/queryKeys";
import {
  useAcceptingWriterApplication,
  useAcceptWriterApplication,
  useRejectWriterApplication,
} from "@/features/writer-application/api/useWriterApplication";

interface ViewProps {
  uid: number;
}

export default function View({ uid }: ViewProps) {
  const { data: applications, refetch } = useQuery(
    queryKeys.writerApplication.detailList(uid),
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
      <div>
        {applications &&
          applications.map((application, index) => (
            <div
              key={application.uid}
              className="my-8 border-t border-b py-4 flex flex-col gap-2"
            >
              <p>{application.user.username}</p>
              <p>{dayjs(application.updateAt).format("YYYY-MM-DD hh:mm:ss")}</p>
              {application.status === "RECEIPT" && (
                <div className="flex justify-between">
                  <p>신청접수</p>
                  {applications.length - 1 === index && (
                    <div className="flex gap-4">
                      <Button
                        onClick={() =>
                          handleClickAccepting(application.user.uid)
                        }
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
                  )}
                </div>
              )}
              {application.status === "REJECT" && <p>승인거절</p>}
              {application.status === "ACCEPTING" && (
                <div className="flex justify-between">
                  <p>승인평가</p>
                  {applications.length - 1 === index && (
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
                  )}
                </div>
              )}
              {application.status === "ACCEPT" && (
                <div className="flex justify-between">
                  <p>승인</p>
                  {applications.length - 1 === index && (
                    <div className="flex gap-4">
                      <Button
                        variant="destructive"
                        onClick={() =>
                          handleClickReject(application.user.uid, "승인 취소")
                        }
                      >
                        승인 취소
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
      </div>
    </main>
  );
}
