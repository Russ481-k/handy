"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Project } from "@/types/section";
import { FiGithub, FiExternalLink } from "react-icons/fi";
import styles from "@/styles/modules/project-section.module.scss";
import { useState } from "react";

interface ProjectSectionClientProps {
  projects: Project[];
  titles: {
    title: string;
    description: string;
  };
}

export function ProjectSectionClient({
  projects,
  titles,
}: ProjectSectionClientProps) {
  // 이미지 오류 상태를 추적하기 위한 상태 배열
  const [imageErrors, setImageErrors] = useState<boolean[]>(
    Array(projects.length).fill(false)
  );

  // 이미지 오류 처리 함수
  const handleImageError = (index: number) => {
    const newImageErrors = [...imageErrors];
    newImageErrors[index] = true;
    setImageErrors(newImageErrors);
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <motion.h2 className={styles.title}>{titles.title}</motion.h2>
          <motion.p className={styles.description}>
            {titles.description}
          </motion.p>
        </div>
        <motion.div className={styles.grid}>
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className={styles.project}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
            >
              <div className={styles.imageWrapper}>
                {imageErrors[index] || !project.image ? (
                  <div className={styles.fallbackImage}>
                    <span>{project.title.charAt(0)}</span>
                  </div>
                ) : (
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className={styles.image}
                    onError={() => handleImageError(index)}
                  />
                )}
              </div>
              <div className={styles.content}>
                <h3 className={styles.projectTitle}>{project.title}</h3>
                <p className={styles.projectDescription}>
                  {project.description}
                </p>
                {project.tags && project.tags.length > 0 && (
                  <div className={styles.tags}>
                    {project.tags.map((tag) => (
                      <span key={tag} className={styles.tag}>
                        {tag}
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
                      aria-label="GitHub 저장소 보기"
                    >
                      <FiGithub size={20} />
                    </a>
                  )}
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.link}
                      aria-label="라이브 데모 보기"
                    >
                      <FiExternalLink size={20} />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
