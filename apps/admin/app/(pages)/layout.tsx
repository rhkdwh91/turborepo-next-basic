import ReactQueryProvider from "@ui/src/providers/ReactQueryProvider";

import "@repo/tailwind-config/globals.css";
import ThemeProvider from "components/providers/ThemeProvider";
import ToastProvider from "@repo/ui/providers/ToastProvider";
import Link from "next/link";
import LogoutButton from "@/components/atoms/LogoutButton";
import { getServerSession } from "next-auth";
import authOptions from "@/auth.config";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body>
        <ReactQueryProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <ToastProvider>
              {session && (
                <header className="px-2.5 py-10 max-w-6xl lg:max-w-6xl mx-auto flex justify-between">
                  <Link href="/" className="font-bold text-2xl">
                    KLOG ADMIN
                  </Link>
                  <LogoutButton />
                </header>
              )}
              <main className="px-2.5 py-10 max-w-6xl lg:max-w-6xl mx-auto">
                {children}
              </main>
            </ToastProvider>
          </ThemeProvider>
        </ReactQueryProvider>
        <div id={"modal-root"} />
      </body>
    </html>
  );
}
