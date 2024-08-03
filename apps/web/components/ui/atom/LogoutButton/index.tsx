"use client";

import { useCallback } from "react";
import { Button } from "@ui/src/components/atom/Button";
import { signOut } from "next-auth/react";

export default function LogoutButton() {
  const handleClickLogout = useCallback(async () => {
    await signOut();
  }, []);

  return <Button onClick={handleClickLogout}>Logout</Button>;
}
