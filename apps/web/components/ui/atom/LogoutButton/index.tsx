"use client";

import { useCallback, memo } from "react";
import { Button } from "@ui/src/components/atom/Button";
import { signOut } from "next-auth/react";

export default memo(function LogoutButton() {
  const handleClickLogout = useCallback(async () => {
    await signOut();
  }, []);

  return (
    <Button variant="ghost" onClick={handleClickLogout}>
      Logout
    </Button>
  );
});
