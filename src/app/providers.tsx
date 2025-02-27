"use client";

import { PropsWithChildren, useEffect, useState } from "react";
import { ThemeProvider } from "next-themes";

export function Providers({ children }: PropsWithChildren) {
  // Add a client-side-only rendering check
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <ThemeProvider
      attribute="data-theme"
      defaultTheme="light"
      enableSystem={false}
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  );
}
