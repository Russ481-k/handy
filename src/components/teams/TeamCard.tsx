"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Teams } from "@/types/section";
import styles from "@/styles/modules/TeamCard.module.scss";
import { useState } from "react";

interface TeamCardProps {
  member: Teams;
  className?: string;
}

export function TeamCard({ member, className = "" }: TeamCardProps) {
  // 이미지 로드 오류 처리를 위한 상태
  const [imageError, setImageError] = useState(false);

  // 컨테이너 클래스 설정
  const containerClass = `${styles.card} ${className}`;

  return (
    <motion.div
      className={containerClass}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <div className={styles.imageContainer}>
        {imageError ? (
          <div className={styles.fallbackImage}>
            <span>{member.name.charAt(0)}</span>
          </div>
        ) : (
          <Image
            src={member.image}
            alt={member.name}
            fill
            className={styles.image}
            onError={() => setImageError(true)}
          />
        )}
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{member.name}</h3>
        <p className={styles.role}>{member.role}</p>
        <p className={styles.description}>{member.description}</p>
      </div>
    </motion.div>
  );
}
