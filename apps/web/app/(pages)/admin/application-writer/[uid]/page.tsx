import View from "./view";

interface PageProps {
  params: {
    uid: string;
  };
}

export default function Page({ params }: PageProps) {
  const { uid } = await params;
  return <View uid={Number(uid)} />;
}
