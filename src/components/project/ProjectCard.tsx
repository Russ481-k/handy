"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FiGithub, FiExternalLink } from "react-icons/fi";
import { Project } from "@/types/project";
import styles from "@/styles/modules/ProjectCard.module.scss";
import { useState } from "react";

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
    imageError || !project.thumbnail || project.thumbnail === "";

  return (
    <motion.div
      className={containerClass}
      initial={{ y: 0 }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      style={{ position: "relative", zIndex: 1 }}
    >
      <div className={styles.imageContainer}>
        {showFallbackImage ? (
          <div className={styles.fallbackImage}>
            <span>{project.title.charAt(0)}</span>
          </div>
        ) : (
          <Image
            src={project.thumbnail}
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
        <div className={styles.technologies}>
          {project.technologies.map((tech) => (
            <span key={tech} className={styles.technology}>
              {tech}
            </span>
          ))}
        </div>
        <div className={styles.links}>
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
              aria-label={`GitHub 링크: ${project.title}`}
            >
              <FiGithub aria-hidden="true" size={20} />
            </a>
          )}
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
              aria-label={`데모 링크: ${project.title}`}
            >
              <FiExternalLink aria-hidden="true" size={20} />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
