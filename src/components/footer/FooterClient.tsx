"use client";

import Link from "next/link";
import { FooterData } from "@/types/footer";
import styles from "@/styles/modules/footer.module.scss";
import {
  FiGithub,
  FiTwitter,
  FiInstagram,
  FiLinkedin,
  FiFacebook,
  FiYoutube,
  FiMail,
  FiGlobe,
  FiExternalLink,
} from "react-icons/fi";

export function FooterClient({ slogan, links, copyright }: FooterData) {
  const currentYear = new Date().getFullYear();

  // 아이콘 매핑 함수
  const getIcon = (name: string) => {
    const iconName = name.toLowerCase();

    switch (iconName) {
      case "github":
        return <FiGithub />;
      case "twitter":
      case "x":
        return <FiTwitter />;
      case "instagram":
        return <FiInstagram />;
      case "linkedin":
        return <FiLinkedin />;
      case "facebook":
        return <FiFacebook />;
      case "youtube":
        return <FiYoutube />;
      case "email":
      case "mail":
        return <FiMail />;
      case "website":
      case "web":
        return <FiGlobe />;
      default:
        return <FiExternalLink />;
    }
  };

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
            <div className={styles.socialLinks}>
              {links.social.map((link) => (
                <Link
                  key={link.name}
                  href={link.url}
                  className={styles.socialLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={link.name}
                >
                  <span className={styles.socialIcon}>
                    {getIcon(link.icon || link.name)}
                  </span>
                  <span className={styles.socialName}>{link.name}</span>
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
          <p>
            {copyright} © {currentYear}
          </p>
        </div>
      </div>
    </footer>
  );
}
