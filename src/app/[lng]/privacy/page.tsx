"use client";

import { use } from "react";
import { useTranslation } from "@/app/i18n/client";
import styles from "@/styles/modules/privacy.module.scss";

export default function PrivacyPage({
  params,
}: {
  params: Promise<{ lng: string }>;
}) {
  const { lng } = use(params);
  const { t } = useTranslation(lng, "common");

  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <h1>{t("privacy_page.title")}</h1>
        <p>{t("privacy_page.subtitle")}</p>
      </section>
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
    </main>
  );
}
