"use client";

import styles from "@/styles/modules/about.module.scss";
import { useTranslation } from "@/app/i18n/client";

import type { CustomTypeOptions } from "@/app/i18n/types";
import { Hero } from "@/components/hero/Hero";
import { Features } from "@/components/features/Features";
import { Feature } from "@/types/section";
import { Wave } from "@/components/common/Wave";

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

  // '핵심 가치' 데이터를 'Feature' 타입으로 변환
  const features: Feature[] = [
    {
      icon: "rocket",
      title: t("about_page.values.items.0.title"),
      description: t("about_page.values.items.0.description"),
    },
    {
      icon: "shield",
      title: t("about_page.values.items.1.title"),
      description: t("about_page.values.items.1.description"),
    },
    {
      icon: "people",
      title: t("about_page.values.items.2.title"),
      description: t("about_page.values.items.2.description"),
    },
  ];

  const historyItems = t<HistoryItem[]>("about_page.history.items", {
    returnObjects: true,
    defaultValue: [{ year: "", title: "", description: "" }],
  });

  return (
    <main>
      <Hero
        title={t("about_page.title")}
        description={t("about_page.subtitle")}
      />
      <section className={styles.history}>
        <Wave />
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

      {/* 기존 'values' 섹션을 Features 컴포넌트로 대체 */}
      <Features
        lng={lng}
        title={t("about_page.values.title")}
        features={features}
      />
    </main>
  );
}
