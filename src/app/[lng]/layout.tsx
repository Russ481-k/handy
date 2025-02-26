import { dir } from "i18next";
import { languages } from "../i18n/settings";
import TranslatedHeader from "../components/TranslatedHeader";
import FloatingButtons from "../components/FloatingButtons";
import "../styles/globals.scss";
import Footer from "../components/Footer";
import { Providers } from "../providers";

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }));
}

export async function generateMetadata() {
  return {
    title: "Handy",
    description: "Handy - Innovation for Everyone",
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lng: string }>;
}) {
  const { lng } = await params;

  return (
    <html lang={lng} dir={dir(lng)}>
      <body>
        <Providers>
          <TranslatedHeader lng={lng} />
          {children}
          <FloatingButtons />
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
