import { ReactNode } from "react";
import { Wave } from "./Wave";
import styles from "@/styles/modules/wavy-section.module.scss";
import { LazyRender } from "./LazyRender";

interface WavySectionProps {
  children: ReactNode;
  className?: string;
  contentClassName?: string;
}

export const WavySection = ({
  children,
  className,
  contentClassName,
}: WavySectionProps) => {
  return (
    <section className={`${styles.wavySection} ${className || ""}`}>
      <LazyRender height="10vh" className={styles.waveWrapper}>
        <Wave />
      </LazyRender>
      <div className={`${styles.content} ${contentClassName || ""}`}>
        {children}
      </div>
      <LazyRender
        height="10vh"
        className={`${styles.waveWrapper} ${styles.waveBottom}`}
      >
        <Wave />
      </LazyRender>
    </section>
  );
};
