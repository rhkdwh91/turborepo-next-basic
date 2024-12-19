import View from "./view";

interface PageProps {
  params: Promise<{
    uid: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  const { uid } = await params;
  return <View uid={Number(uid)} />;
}
