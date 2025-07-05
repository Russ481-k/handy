import "@/styles/globals.scss";
import type { Metadata } from "next";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: {
    template: "%s | Handy",
    default: "Handy",
  },
  description: "Handy - Innovation for Everyone",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
