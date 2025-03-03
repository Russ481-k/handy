"use client";

import ThemeSwitch from "./ThemeSwitch";
import LanguageSwitch from "./LanguageSwitch";
import ScrollToTop from "./ScrollToTop";
import styles from "@/styles/modules/ui-controls.module.scss";

export default function FloatingButtons() {
  return (
    <div className={styles.floatingContainer}>
      <ScrollToTop />
      <LanguageSwitch />
      <ThemeSwitch />
    </div>
  );
}
