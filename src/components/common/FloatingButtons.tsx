"use client";

import ThemeSwitch from "./ThemeSwitch";
import LanguageSwitch from "./LanguageSwitch";
import ScrollToTop from "./ScrollToTop";
import styles from "@/styles/modules/FloatingButtons.module.scss";

export default function FloatingButtons() {
  return (
    <div className={styles.floatingContainer}>
      <ScrollToTop />
      <LanguageSwitch />
      <ThemeSwitch />
    </div>
  );
}
