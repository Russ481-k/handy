"use client";

import Link from "next/link";
import { FooterData } from "@/types/footer";
import styles from "@/styles/modules/Footer.module.scss";

export function FooterClient({ slogan, links, copyright }: FooterData) {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.section}>
            <h3 className={styles.title}>Handy</h3>
            <p className={styles.description}>{slogan}</p>
          </div>
          <div className={styles.section}>
            <h4 className={styles.subtitle}>Social</h4>
            <div className={styles.links}>
              {links.social.map((link) => (
                <Link key={link.name} href={link.url} className={styles.link}>
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
          <div className={styles.section}>
            <h4 className={styles.subtitle}>Legal</h4>
            <div className={styles.links}>
              {links.legal.map((link) => (
                <Link key={link.name} href={link.url} className={styles.link}>
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className={styles.copyright}>
          <p>{copyright}</p>
        </div>
      </div>
    </footer>
  );
}
