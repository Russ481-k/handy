"use client";

import React from "react";
import styles from "@/styles/modules/renewal-section.module.scss";
import { useTranslation } from "@/app/i18n/client";
import { BaseProps } from "@/types/section";
import { useCursor } from "@/contexts/CursorContext";

export function RenewalSection({ lng }: BaseProps) {
  const { t } = useTranslation(lng, "common");
  const { setCursorStyle } = useCursor();

  return (
    <div
      className={styles.renewalContainer}
      onMouseEnter={() => setCursorStyle("renewal")}
      onMouseLeave={() => setCursorStyle("default")}
    >
      <div className={styles.content}>
        <p className={styles.title}>{t("renewal.title")}</p>
        <p className={styles.subtitle}>{t("renewal.subtitle")}</p>
      </div>
    </div>
  );
}
