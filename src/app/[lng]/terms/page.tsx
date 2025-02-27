"use client";

import { use } from "react";
import { useTranslation } from "../../i18n/client";
import styles from "./terms.module.scss";

export default function TermsPage({
  params,
}: {
  params: Promise<{ lng: string }>;
}) {
  const { lng } = use(params);
  const { t } = useTranslation(lng, "common");

  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <h1>{t("terms_page.title")}</h1>
        <p>{t("terms_page.subtitle")}</p>
      </section>
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
    </main>
  );
}
