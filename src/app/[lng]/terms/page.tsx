"use client";

import { use } from "react";
import { useTranslation } from "@/app/i18n/client";
import styles from "@/styles/modules/terms.module.scss";
import { WavySection } from "@/components/common/WavySection";
import { Hero } from "@/components/hero/Hero";

export default function TermsPage({
  params: { lng },
}: {
  params: { lng: string };
}) {
  const { t } = useTranslation(lng, "common");

  return (
    <main className={styles.main}>
      <Hero
        title={t("terms_page.title")}
        description={t("terms_page.subtitle")}
      />
      <WavySection
        className={styles.waveTop}
        contentClassName={styles.container}
      >
        <section className={styles.content}>
          <div className={styles.container}>
            <div className={styles.section}>
              <h2>{t("terms_page.usage.title")}</h2>
              <div className={styles.info}>{t("terms_page.usage.content")}</div>
            </div>
            <div className={styles.section}>
              <h2>{t("terms_page.restrictions.title")}</h2>
              <div className={styles.info}>
                {t("terms_page.restrictions.content")}
              </div>
            </div>
            <div className={styles.section}>
              <h2>{t("terms_page.termination.title")}</h2>
              <div className={styles.info}>
                {t("terms_page.termination.content")}
              </div>
            </div>
          </div>
        </section>
      </WavySection>
    </main>
  );
}
