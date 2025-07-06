import React from "react";
import { Wave } from "./Wave";
import styles from "@/styles/modules/wavy-section.module.scss";

interface WavySectionProps {
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
}

export const WavySection = ({
  children,
  className,
  contentClassName,
}: WavySectionProps) => {
  return (
    <section className={`${styles.section} ${className || ""}`}>
      <div className={styles.waveTop}>
        <Wave />
      </div>
      <div className={`${styles.content} ${contentClassName || ""}`}>
        {children}
      </div>
      <div className={styles.waveBottom}>
        <Wave />
      </div>
    </section>
  );
};
