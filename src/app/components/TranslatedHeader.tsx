"use client";

import { useTranslation } from "../i18n/client";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoLogoGithub } from "react-icons/io5";
import LanguageSwitch from "./LanguageSwitch";
import ThemeSwitch from "./ThemeSwitch";
import styles from "./Header.module.scss";

export default function TranslatedHeader({ lng }: { lng: string }) {
  const pathname = usePathname();
  const router = useRouter();
  const { t } = useTranslation(lng, "common");
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (scrollY > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Calculate scroll progress (0 to 1) up to 300px
      const progress = Math.min(scrollY / 300, 1);
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigation = [
    { name: t("navigation.home"), href: `/${lng}` },
    { name: t("navigation.about"), href: `/${lng}/about` },
    { name: t("navigation.projects"), href: `/${lng}/projects` },
    { name: t("navigation.blog"), href: `/${lng}/blog` },
    { name: t("navigation.contact"), href: `/${lng}/contact` },
  ];

  const isActive = (href: string) => {
    if (href === `/${lng}`) {
      return pathname === href;
    }
    return pathname?.startsWith(href);
  };

  return (
    <header
      className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}
      style={{
        backgroundColor: `rgba(var(--card-background-rgb), ${
          1 - scrollProgress
        })`,
        backdropFilter: `blur(${scrollProgress * 10}px)`,
      }}
    >
      <div className={styles.container}>
        <Link href={`/${lng}`} className={styles.logo}>
          LOGO
        </Link>
        <nav className={styles.nav}>
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={isActive(item.href) ? styles.active : ""}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
