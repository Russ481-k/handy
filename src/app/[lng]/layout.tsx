import type { Metadata } from "next";
import styles from "@/styles/modules/layout.module.scss";
import { MouseContextProvider } from "@/contexts/MouseContext";
import TranslatedHeader from "@/components/header/TranslatedHeader";
import Footer from "@/components/footer/Footer";
import FloatingButtons from "@/components/common/FloatingButtons";
import { dir } from "i18next";
import { Providers } from "../providers";
import { CustomCursor } from "@/components/common/CustomCursor";
import { CursorProvider } from "@/contexts/CursorContext";

interface RootLayoutProps {
  children: React.ReactNode;
  params: { lng: string };
}

export default function RootLayout({
  children,
  params: { lng },
}: RootLayoutProps) {
  return (
    <MouseContextProvider>
      <div
        className={styles.body}
        dir={dir(lng)}
        lang={lng}
        suppressHydrationWarning
      >
        <div className={styles.wrapper}>
          <Providers>
            <CursorProvider>
              <CustomCursor />
              {/* <TranslatedHeader lng={lng} /> */}
              <main className={styles.main}>{children}</main>
              <Footer lng={lng} />
            </CursorProvider>
          </Providers>
          <FloatingButtons />
        </div>
      </div>
    </MouseContextProvider>
  );
}
