import View from "./view";

interface PageProps {
  params: {
    name: string;
  };
}

export default function Page({ params }: PageProps) {
  return <View name={params.name} />;
}
