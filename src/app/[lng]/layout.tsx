import { dir } from "i18next";
import { languages } from "../i18n/settings";
import TranslatedHeader from "@/components/header/TranslatedHeader";
import FloatingButtons from "@/components/common/FloatingButtons";
import Footer from "@/components/footer/Footer";
import { BaseProps } from "@/types/section";
import type { Metadata } from "next";
import styles from "@/styles/modules/layout.module.scss";

interface RootLayoutProps {
  children: React.ReactNode;
  params: Promise<BaseProps>;
}

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<BaseProps>;
}): Promise<Metadata> {
  const { lng } = await params;
  return {
    title: {
      template: "%s | Handy",
      default: "Handy",
    },
    description: "Handy - Innovation for Everyone",
    alternates: {
      canonical: `/${lng}`,
      languages: {
        ko: "/ko",
        en: "/en",
      },
    },
  };
}

export default async function LangLayout({
  children,
  params,
}: RootLayoutProps) {
  const { lng } = await params;

  return (
    <div
      className={styles.body}
      dir={dir(lng)}
      lang={lng}
      suppressHydrationWarning
    >
      <div className={styles.wrapper}>
        <TranslatedHeader lng={lng} />
        <main className={styles.main}>{children}</main>
        <Footer lng={lng} />
      </div>
      <FloatingButtons />
    </div>
  );
}
