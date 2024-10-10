import View from "./view";

interface PageProps {
  params: {
    uid: string;
  };
}

export default function Page({ params }: PageProps) {
  const uid = Number(params.uid);
  return <View uid={uid} />;
}
