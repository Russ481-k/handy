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
    return null;
  }

  const handleThemeChange = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <button
      onClick={handleThemeChange}
      className={styles.floatingButton}
      aria-label="Toggle Theme"
    >
      {theme === "dark" ? <IoMoonOutline /> : <IoSunnyOutline />}
    </button>
  );
}
