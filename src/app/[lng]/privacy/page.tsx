"use client";

import { use } from "react";
import { useTranslation } from "@/app/i18n/client";
import styles from "@/styles/modules/privacy.module.scss";
import { Hero } from "@/components/hero/Hero";
import { WavySection } from "@/components/common/WavySection";

export default function PrivacyPage({
  params: { lng },
}: {
  params: { lng: string };
}) {
  const { t } = useTranslation(lng, "common");

  return (
    <main className={styles.main}>
      <Hero
        title={t("privacy_page.title")}
        description={t("privacy_page.subtitle")}
      />
      <WavySection
        className={styles.waveTop}
        contentClassName={styles.container}
      >
        <section className={styles.content}>
          <div className={styles.container}>
            <div className={styles.section}>
              <h2>{t("privacy_page.data_collection.title")}</h2>
              <div className={styles.info}>
                {t("privacy_page.data_collection.content")}
              </div>
            </div>
            <div className={styles.section}>
              <h2>{t("privacy_page.data_usage.title")}</h2>
              <div className={styles.info}>
                {t("privacy_page.data_usage.content")}
              </div>
            </div>
            <div className={styles.section}>
              <h2>{t("privacy_page.cookies.title")}</h2>
              <div className={styles.info}>
                {t("privacy_page.cookies.content")}
              </div>
            </div>
          </div>
        </section>
      </WavySection>
    </main>
  );
}
