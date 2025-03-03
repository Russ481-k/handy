"use client";

import Image from "next/image";

import styles from "@/styles/modules/team-card.module.scss";
import { useState } from "react";
import BaseCard from "../common/BaseCard";
import { Teams } from "@/types/section";

interface TeamCardProps {
  member: Teams;
  className?: string;
}

export function TeamCard({ member, className = "" }: TeamCardProps) {
  // 이미지 로드 오류 처리를 위한 상태
  const [imageError, setImageError] = useState(false);

  // 컨테이너 클래스
  const containerClass = `${styles.card} ${className}`;

  // 이미지 URL이 없는 경우도 fallbackImage 사용
  const showFallbackImage = imageError || !member.image || member.image === "";

  return (
    <BaseCard className={containerClass}>
      <div className={styles.imageContainer}>
        {showFallbackImage ? (
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
    </BaseCard>
  );
}
