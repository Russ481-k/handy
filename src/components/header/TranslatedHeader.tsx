"use client";

import { useTranslation } from "@/app/i18n/client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useEffect, useState, useCallback } from "react";
import { IoMenu, IoClose } from "react-icons/io5";
import styles from "@/styles/modules/Header.module.scss";

export default function TranslatedHeader({ lng }: { lng: string }) {
  const pathname = usePathname();
  const { t } = useTranslation(lng, "common");
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [navigation, setNavigation] = useState<
    Array<{ name: string; href: string }>
  >([]);

  useEffect(() => {
    setMounted(true);
    setNavigation([
      { name: t("navigation.home"), href: `/${lng}` },
      { name: t("navigation.about"), href: `/${lng}/about` },
      { name: t("navigation.projects"), href: `/${lng}/projects` },
      { name: t("navigation.blog"), href: `/${lng}/blog` },
      { name: t("navigation.contact"), href: `/${lng}/contact` },
    ]);
  }, [lng, t]);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 0);
      setScrollProgress(Math.min(scrollY / 1280, 1));
      closeMenu(); // 스크롤 시 메뉴 닫기
    };

    const handleClickOutside = (event: MouseEvent) => {
      const header = document.querySelector(`.${styles.header}`);
      if (header && !header.contains(event.target as Node)) {
        closeMenu();
      }
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [closeMenu]);

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
            <div className={styles.placeholder} />
          </nav>
        </div>
      </header>
    );
  }

  return (
    <>
      {isMenuOpen && <div className={styles.overlay} onClick={closeMenu} />}
      <header
        className={`${styles.header} ${scrolled ? styles.scrolled : ""} ${
          isMenuOpen ? styles.menuOpen : ""
        }`}
        style={{
          backgroundColor: `rgba(var(--header-background-rgb), ${
            isMenuOpen ? 1 : scrollProgress
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
          <nav
            className={styles.nav}
            style={{
              backgroundColor: isMenuOpen
                ? `rgba(var(--header-background-rgb), 0.95)`
                : "transparent",
              backdropFilter: isMenuOpen ? "blur(10px)" : "none",
            }}
          >
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
    </>
  );
}
