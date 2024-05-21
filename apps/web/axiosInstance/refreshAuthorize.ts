import { signIn } from "next-auth/react";

export default async function refreshAuthorize() {
  await signIn("credentials", {
    refresh: true,
  });
}
