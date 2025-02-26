"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoLogoGithub, IoLogoLinkedin, IoLogoTwitter } from "react-icons/io5";
import styles from "./Footer.module.scss";
import { useTranslation } from "../i18n/client";

export default function TranslatedFooter() {
  const pathname = usePathname();
  const lng = pathname?.split("/")[1];
  const { t } = useTranslation(lng, "common");

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.brand}>
            <h3>LOGO</h3>
            <p>{t("footer.slogan")}</p>
          </div>
          <div className={styles.links}>
            <div className={styles.section}>
              <h4>{t("footer.company")}</h4>
              <Link href={`/${lng}/about`}>{t("navigation.about")}</Link>
              <Link href={`/${lng}/projects`}>{t("navigation.projects")}</Link>
              <Link href={`/${lng}/contact`}>{t("navigation.contact")}</Link>
            </div>
            <div className={styles.section}>
              <h4>{t("footer.legal")}</h4>
              <Link href={`/${lng}/privacy`}>{t("footer.privacyPolicy")}</Link>
              <Link href={`/${lng}/terms`}>{t("footer.termsOfService")}</Link>
            </div>
          </div>
        </div>
        <div className={styles.bottom}>
          <p>{t("footer.copyright")}</p>
          <div className={styles.social}>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <IoLogoGithub />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <IoLogoLinkedin />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <IoLogoTwitter />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
