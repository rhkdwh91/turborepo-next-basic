"use client";

import { ToastContainer } from "kyz-toast";
import AlertModal from "@repo/ui/components/organism/AlertModal";
import ConfirmModal from "@repo/ui/components/organism/ConfirmModal";

export default function ToastProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <AlertModal />
      <ConfirmModal />
      <ToastContainer delay={2000} />
    </>
  );
}
