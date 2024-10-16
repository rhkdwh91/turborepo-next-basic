import ReactQueryProvider from "@ui/src/providers/ReactQueryProvider";

import "@repo/tailwind-config/globals.css";
import ThemeProvider from "components/providers/ThemeProvider";
import ToastProvider from "@repo/ui/providers/ToastProvider";
import SessionProvider from "components/providers/SessionProvider";
import { getServerSession } from "next-auth";
import authOptions from "@/auth.config";
import Header from "@/components/organism/Header";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <ReactQueryProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem
              disableTransitionOnChange
            >
              <ToastProvider>
                <Header session={session} />
                <main className="px-2.5 py-10 max-w-6xl lg:max-w-6xl mx-auto">
                  {children}
                </main>
              </ToastProvider>
            </ThemeProvider>
          </ReactQueryProvider>
          <div id={"modal-root"} />
        </SessionProvider>
      </body>
    </html>
  );
}
