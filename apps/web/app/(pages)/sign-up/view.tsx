"use client";

import { Button } from "@ui/src/components/atom/Button";
import { signIn } from "next-auth/react";

export default function View() {
  const handleClickGoogle = async () => {
    await signIn("google", { callbackUrl: "/sign-up" });
  };
  return (
    <main>
      <h1>회원가입</h1>
      <em>회원가입에 동의하십니까?</em>
      <section>
        <Button onClick={handleClickGoogle}>Google</Button>
      </section>
    </main>
  );
}
