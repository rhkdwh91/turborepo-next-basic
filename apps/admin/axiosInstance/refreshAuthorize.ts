import { signIn, signOut } from "next-auth/react";

export default async function refreshAuthorize() {
  const result = await signIn("credentials", {
    refresh: true,
    redirect: false,
  });

  console.log(result, "REFRESH");

  if (result && result.status === 401) {
    // 세션 만료 또는 갱신 실패 시 로그아웃 처리
    console.log("SignOut");
    await signOut();
  }
}
