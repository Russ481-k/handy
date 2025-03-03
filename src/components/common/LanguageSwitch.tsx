"use client";

import { usePathname, useRouter } from "next/navigation";
import styles from "@/styles/modules/ui-controls.module.scss";

export default function LanguageSwitch() {
  const pathname = usePathname();
  const router = useRouter();
  const currentLang = pathname?.split("/")[1];

  const handleLanguageChange = () => {
    const currentPathname = pathname || "/";
    const segments = currentPathname.split("/");
    // Toggle between 'ko' and 'en'
    segments[1] = currentLang === "ko" ? "en" : "ko";
    router.push(segments.join("/"));
  };

  return (
    <button
      onClick={handleLanguageChange}
      className={styles.floatingButton}
      aria-label="Toggle Language"
    >
      {currentLang?.toUpperCase()}
    </button>
  );
}
