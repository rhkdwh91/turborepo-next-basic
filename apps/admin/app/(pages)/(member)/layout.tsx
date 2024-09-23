import LogoutButton from "components/atoms/LogoutButton";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <header>
        <LogoutButton />
      </header>
      <main className="px-2.5 py-10 max-w-6xl lg:max-w-6xl mx-auto">
        {children}
      </main>
    </>
  );
}
