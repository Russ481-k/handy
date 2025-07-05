"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { IoSunnyOutline, IoMoonOutline } from "react-icons/io5";
import styles from "@/styles/modules/ui-controls.module.scss";

export default function ThemeSwitch() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button className={styles.floatingButton} aria-label="Loading theme">
        <span className="opacity-0">...</span>
      </button>
    );
  }

  const handleThemeChange = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <button
      onClick={handleThemeChange}
      className={styles.floatingButton}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      {theme === "dark" ? (
        <IoSunnyOutline className="w-5 h-5" />
      ) : (
        <IoMoonOutline className="w-5 h-5" />
      )}
    </button>
  );
}
