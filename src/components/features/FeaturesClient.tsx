"use client";

import { motion } from "framer-motion";
import { Feature } from "@/types/section";
import styles from "@/styles/modules/features.module.scss";
import {
  IoHeartOutline,
  IoRocketOutline,
  IoTrendingUpOutline,
  IoShieldCheckmarkOutline,
  IoPeopleOutline,
} from "react-icons/io5";
import { Wave } from "../common/Wave";

interface FeaturesClientProps {
  features: Feature[];
  title: string;
}

export function FeaturesClient({ features, title }: FeaturesClientProps) {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "rocket":
        return <IoRocketOutline aria-hidden="true" />;
      case "heart":
        return <IoHeartOutline aria-hidden="true" />;
      case "trending-up":
        return <IoTrendingUpOutline aria-hidden="true" />;
      case "shield":
        return <IoShieldCheckmarkOutline aria-hidden="true" />;
      case "people":
        return <IoPeopleOutline aria-hidden="true" />;
      default:
        // 기본 아이콘을 항상 반환하여 하이드레이션 오류 방지
        return <span aria-hidden="true" className={styles.fallbackIcon}></span>;
    }
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <motion.h2 className={styles.title}>{title}</motion.h2>
        <motion.div className={styles.grid}>
          {Array.isArray(features) &&
            features.map((feature, index) => (
              <motion.div
                key={index}
                className={styles.feature}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <div className={styles.content}>
                  <div className={styles.iconWrapper}>
                    {getIcon(feature.icon)}
                  </div>
                  <h3 className={styles.featureTitle}>{feature.title}</h3>
                  <p className={styles.description}>{feature.description}</p>
                </div>
              </motion.div>
            ))}
        </motion.div>
      </div>
      <Wave />
    </section>
  );
}
