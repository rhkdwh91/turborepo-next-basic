import View from "./view";

interface PageProps {
  params: Promise<{
    name: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  const { name } = await params;
  return <View name={name} />;
}
