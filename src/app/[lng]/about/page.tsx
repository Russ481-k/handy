"use client";

import styles from "@/styles/modules/about.module.scss";
import { useTranslation } from "@/app/i18n/client";
import {
  IoRocketOutline,
  IoShieldCheckmarkOutline,
  IoPeopleOutline,
} from "react-icons/io5";
import type { CustomTypeOptions } from "@/app/i18n/types";
import { ReactElement } from "react";
import { use } from "react";
import { ValueItem } from "@/types/section";

type HistoryItem =
  CustomTypeOptions["resources"]["common"]["about_page"]["history"]["items"][number];

interface AboutPageProps {
  params: {
    lng: string;
  };
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { lng } = params;
  const { t } = await useTranslation(lng);

  const values: (ValueItem & { icon: ReactElement })[] = [
    {
      icon: <IoRocketOutline />,
      title: t("about_page.values.items.0.title"),
      description: t("about_page.values.items.0.description"),
    },
    {
      icon: <IoShieldCheckmarkOutline />,
      title: t("about_page.values.items.1.title"),
      description: t("about_page.values.items.1.description"),
    },
    {
      icon: <IoPeopleOutline />,
      title: t("about_page.values.items.2.title"),
      description: t("about_page.values.items.2.description"),
    },
  ];

  const historyItems = t<HistoryItem[]>("about_page.history.items", {
    returnObjects: true,
    defaultValue: [{ year: "", title: "", description: "" }],
  });

  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <h1>{t("about_page.title")}</h1>
        <p>{t("about_page.subtitle")}</p>
      </section>

      <section className={styles.history}>
        <h2>{t("about_page.history.title")}</h2>
        <div className={styles.timeline}>
          {historyItems.map((item, index) => (
            <div key={index} className={styles.timelineItem}>
              <div className={styles.year}>{item.year}</div>
              <div className={styles.content}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.values}>
        <h2>{t("about_page.values.title")}</h2>
        <div className={styles.valueGrid}>
          {values.map((value, index) => (
            <div key={index} className={styles.valueCard}>
              <div className={styles.icon}>{value.icon}</div>
              <h3>{value.title}</h3>
              <p>{value.description}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
