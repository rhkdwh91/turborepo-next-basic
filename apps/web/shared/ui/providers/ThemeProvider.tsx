// shared/ui/providers/ThemeProvider.tsx
"use client";

import { ThemeProvider as NextThemeProvider } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeProvider({
  children,
  ...props
}: {
  children: React.ReactNode;
  attribute?: string;
  defaultTheme?: string;
  enableSystem?: boolean;
  disableTransitionOnChange?: boolean;
}) {
  // 클라이언트 사이드 렌더링을 위한 마운트 체크
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // 초기 렌더링 시 hydration 불일치를 방지
  if (!mounted) {
    return <>{children}</>;
  }

  return <NextThemeProvider {...props}>{children}</NextThemeProvider>;
}
