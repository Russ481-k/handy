"use client";

import { use } from "react";
import { useTranslation } from "@/app/i18n/client";
import styles from "@/styles/modules/legal.module.scss";
import { Hero } from "@/components/hero/Hero";
import { WavySection } from "@/components/common/WavySection";

export default function LegalPage({
  params: { lng },
}: {
  params: { lng: string };
}) {
  const { t } = useTranslation(lng, "common");

  return (
    <main className={styles.main}>
      <Hero
        title={t("legal_page.title")}
        description={t("legal_page.subtitle")}
      />
      <WavySection
        className={styles.waveTop}
        contentClassName={styles.container}
      >
        <section className={styles.content}>
          <div className={styles.container}>
            <div className={styles.section}>
              <h2>{t("legal_page.company_info.title")}</h2>
              <div className={styles.info}>
                {t("legal_page.company_info.content")}
              </div>
            </div>
            <div className={styles.section}>
              <h2>{t("legal_page.disclaimer.title")}</h2>
              <div className={styles.info}>
                {t("legal_page.disclaimer.content")}
              </div>
            </div>
          </div>
        </section>
      </WavySection>
    </main>
  );
}
