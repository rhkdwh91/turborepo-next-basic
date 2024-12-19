import View from "./view";

interface PageProps {
  params: {
    name: string;
  };
}

export default function Page({ params }: PageProps) {
  const { name } = await params;
  return <View name={name} />;
}
