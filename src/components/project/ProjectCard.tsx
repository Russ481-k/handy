"use client";

import Image from "next/image";
import { FiGithub, FiExternalLink } from "react-icons/fi";
import { Project } from "@/types/section";
import styles from "@/styles/modules/project-card.module.scss";
import { useState } from "react";
import BaseCard from "../common/BaseCard";

interface ProjectCardProps {
  project: Project;
  className?: string;
  isPage?: boolean;
}

export function ProjectCard({
  project,
  className = "",
  isPage = false,
}: ProjectCardProps) {
  const [imageError, setImageError] = useState(false);

  // 페이지 또는 홈 스타일 결정
  const containerClass = `${styles.card} ${
    isPage ? styles.page : ""
  } ${className}`;

  // 이미지 URL이 없는 경우도 fallbackImage 사용
  const showFallbackImage =
    imageError || !project.image || project.image === "";

  return (
    <BaseCard className={containerClass}>
      <div className={styles.imageContainer}>
        {showFallbackImage ? (
          <div className={styles.fallbackImage}>
            <span>{project.title.charAt(0)}</span>
          </div>
        ) : (
          <Image
            src={project.image}
            alt={project.title}
            fill
            className={styles.image}
            onError={() => setImageError(true)}
          />
        )}
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{project.title}</h3>
        <p className={styles.description}>{project.description}</p>

        {project.tags && project.tags.length > 0 && (
          <div className={styles.technologies}>
            {project.tags.map((tech) => (
              <span key={tech} className={styles.technology}>
                {tech}
              </span>
            ))}
          </div>
        )}

        <div className={styles.links}>
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
              aria-label="GitHub 저장소"
            >
              <FiGithub aria-hidden="true" size={20} />
              <span>GitHub</span>
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
              aria-label="라이브 데모"
            >
              <FiExternalLink aria-hidden="true" size={20} />
              <span>Demo</span>
            </a>
          )}
        </div>
      </div>
    </BaseCard>
  );
}
