import { dir } from "i18next";
import { languages } from "../i18n/settings";
import TranslatedHeader from "../components/TranslatedHeader";
import FloatingButtons from "../components/FloatingButtons";
import "../styles/globals.scss";
import Footer from "../components/Footer";

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lng: string }>;
}) {
  const { lng } = await params;
  return {
    title: "Your Company",
    description: "Your company description",
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
        <TranslatedHeader lng={lng} />
        {children}
        <FloatingButtons />
        <Footer />
      </body>
    </html>
  );
}
