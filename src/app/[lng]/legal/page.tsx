"use client";

import { use } from "react";
import { useTranslation } from "../../i18n/client";
import styles from "./legal.module.scss";

export default function LegalPage({
  params,
}: {
  params: Promise<{ lng: string }>;
}) {
  const { lng } = use(params);
  const { t } = useTranslation(lng, "common");

  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <h1>{t("legal_page.title")}</h1>
        <p>{t("legal_page.subtitle")}</p>
      </section>
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
    </main>
  );
}
