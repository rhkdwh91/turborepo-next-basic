import { signIn, signOut } from "next-auth/react";

export default async function refreshAuthorize() {
  const result = await signIn("credentials", {
    refresh: true,
    redirect: false,
  });

  console.log(result, "REFRESH");

  if (!result) {
    // 세션 만료 또는 갱신 실패 시 로그아웃 처리
    await signOut();
  }
}
