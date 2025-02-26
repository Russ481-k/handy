"use client";

import Image from "next/image";
import styles from "../styles/page.module.scss";
import { useTranslation } from "../i18n/client";
import { teamMembers } from "../data/team";
import {
  IoRocketOutline,
  IoTrendingUpOutline,
  IoAtOutline,
} from "react-icons/io5";
import { ReactElement, use } from "react";

interface Feature {
  title: string;
  description: string;
  icon: ReactElement;
}

export default function Home({ params }: { params: Promise<{ lng: string }> }) {
  const { lng } = use(params);
  const { t } = useTranslation(lng, "common");

  const features: Feature[] = [
    {
      title: t("features.items.innovation.title"),
      description: t("features.items.innovation.description"),
      icon: <IoRocketOutline />,
    },
    {
      title: t("features.items.customer.title"),
      description: t("features.items.customer.description"),
      icon: <IoAtOutline />,
    },
    {
      title: t("features.items.growth.title"),
      description: t("features.items.growth.description"),
      icon: <IoTrendingUpOutline />,
    },
  ];

  const currentTeamMembers = teamMembers[lng as keyof typeof teamMembers];

  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <h1>{t("hero.title")}</h1>
        <p>{t("hero.description")}</p>
      </section>

      <section className={styles.features}>
        <h2>{t("features.title")}</h2>
        <div className={styles.featureGrid}>
          {features.map((feature, index) => (
            <div key={index} className={styles.featureCard}>
              <div className={styles.featureIcon}>{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.about}>
        <h2>{t("about.title")}</h2>
        <div className={styles.aboutContent}>
          <div className={styles.mission}>
            <h3>{t("about.mission.title")}</h3>
            <p>{t("about.mission.description")}</p>
          </div>
          <div className={styles.vision}>
            <h3>{t("about.vision.title")}</h3>
            <p>{t("about.vision.description")}</p>
          </div>
        </div>
        <div className={styles.team}>
          <h3>{t("about.team.title")}</h3>
          <div className={styles.teamGrid}>
            {currentTeamMembers.map((member, index) => (
              <div key={index} className={styles.teamCard}>
                <div className={styles.teamImage}>
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={200}
                    height={200}
                  />
                </div>
                <h4>{member.name}</h4>
                <p className={styles.role}>{member.role}</p>
                <p>{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
