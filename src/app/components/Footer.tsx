import TranslatedFooter from "./TranslatedFooter";
import styles from "./Footer.module.scss";

export default function Footer() {
  return (
    <>
      <TranslatedFooter />
      <div className={styles.copyright}>
        © {new Date().getFullYear()} Handy. All rights reserved.
      </div>
    </>
  );
}
