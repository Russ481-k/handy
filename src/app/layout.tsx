import "@/styles/globals.scss";
import type { Metadata } from "next";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: {
    template: "%s | Handy",
    default: "Handy",
  },
  description: "Handy - Innovation for Everyone",
  verification: {
    google: "WsZ6OUTnhbmH4OgcCKXIgu95GMydkZGl6FFLrSEXFRo",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
