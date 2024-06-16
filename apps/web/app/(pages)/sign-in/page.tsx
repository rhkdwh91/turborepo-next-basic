import View from "./view";
import { getProviders } from "next-auth/react";

export default async function Page() {
  const providers = await getProviders();

  return <View providers={providers} />;
}
