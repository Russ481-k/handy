"use client";

import { useTranslation } from "../i18n/client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoMenu, IoClose } from "react-icons/io5";
import styles from "./Header.module.scss";

export default function TranslatedHeader({ lng }: { lng: string }) {
  const pathname = usePathname();
  const { t } = useTranslation(lng, "common");
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 0);
      setScrollProgress(Math.min(scrollY / 1280, 1));
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
    if (href === `/${lng}`) return pathname === href;
    return pathname?.startsWith(href);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // 클라이언트 사이드 렌더링이 완료될 때까지 기본 스타일만 적용
  if (!mounted) {
    return (
      <header className={styles.header}>
        <div className={styles.container}>
          <Link href={`/${lng}`} className={styles.logo}>
            Handy
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

  return (
    <header
      className={`${styles.header} ${scrolled ? styles.scrolled : ""} ${
        isMenuOpen ? styles.menuOpen : ""
      }`}
      style={{
        backgroundColor: `rgba(var(--card-background-rgb), ${
          1 - scrollProgress
        })`,
        backdropFilter: `blur(${scrollProgress * 10}px)`,
      }}
    >
      <div className={styles.container}>
        <Link href={`/${lng}`} className={styles.logo}>
          Handy
        </Link>
        <button className={styles.menuButton} onClick={toggleMenu}>
          {isMenuOpen ? <IoClose /> : <IoMenu className={styles.menuIcon} />}
        </button>
        <nav className={styles.nav}>
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={isActive(item.href) ? styles.active : ""}
              onClick={() => setIsMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
