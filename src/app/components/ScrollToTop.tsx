"use client";

import { useEffect, useState } from "react";
import { IoArrowUpOutline } from "react-icons/io5";
import styles from "./FloatingButtons.module.scss";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    // 초기 스크롤 위치 확인
    toggleVisibility();

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      className={`${styles.floatingButton} ${styles.scrollTop} ${
        isVisible ? styles.visible : ""
      }`}
      onClick={scrollToTop}
      aria-label="Scroll to top"
    >
      <IoArrowUpOutline />
    </button>
  );
}
