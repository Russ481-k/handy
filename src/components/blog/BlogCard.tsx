"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FiClock, FiCalendar } from "react-icons/fi";
import { BlogPost } from "@/types/blog";
import styles from "@/styles/modules/BlogCard.module.scss";
import { useState } from "react";

interface BlogCardProps {
  post: BlogPost;
  className?: string;
  isPage?: boolean;
}

export function BlogCard({
  post,
  className = "",
  isPage = false,
}: BlogCardProps) {
  const [imageError, setImageError] = useState(false);

  // 페이지 또는 홈 스타일 결정
  const containerClass = `${styles.card} ${
    isPage ? styles.page : ""
  } ${className}`;

  // 이미지 URL이 없는 경우도 fallbackImage 사용
  const showFallbackImage =
    imageError || !post.thumbnail || post.thumbnail === "";

  return (
    <motion.div
      className={containerClass}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <div className={styles.imageContainer}>
        {showFallbackImage ? (
          <div className={styles.fallbackImage}>
            <span>{post.title.charAt(0)}</span>
          </div>
        ) : (
          <Image
            src={post.thumbnail}
            alt={post.title}
            fill
            className={styles.image}
            onError={() => setImageError(true)}
          />
        )}
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{post.title}</h3>
        <p className={styles.excerpt}>{post.excerpt}</p>

        {post.tags && post.tags.length > 0 && (
          <div className={styles.tags}>
            {post.tags.map((tag) => (
              <span key={tag} className={styles.tag}>
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className={styles.meta}>
          <div className={styles.metaItem} aria-label="작성일">
            <FiCalendar aria-hidden="true" size={20} />
            <span>{post.date}</span>
          </div>
          <div className={styles.metaItem} aria-label="읽는 시간">
            <FiClock aria-hidden="true" size={20} />
            <span>{post.readTime}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
