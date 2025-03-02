"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Project } from "@/types/section";
import { FiGithub, FiExternalLink } from "react-icons/fi";
import styles from "@/styles/modules/ProjectSection.module.scss";
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
                {imageErrors[index] ||
                !project.image ||
                project.image === "" ? (
                  <div className={styles.fallbackImage}>
                    <span>{project.title.charAt(0)}</span>
                  </div>
                ) : (
                  <Image
                    src={project.image}
                    alt={project.title}
                    className={styles.image}
                    width={400}
                    height={225}
                    onError={() => handleImageError(index)}
                  />
                )}
              </div>
              <div className={styles.content}>
                <h3 className={styles.projectTitle}>{project.title}</h3>
                <p className={styles.projectDescription}>
                  {project.description}
                </p>
                <div className={styles.tags}>
                  {project.tags.map((tag: string, tagIndex: number) => (
                    <span key={tagIndex} className={styles.tag}>
                      {tag}
                    </span>
                  ))}
                </div>
                <div className={styles.links}>
                  {project.github && (
                    <Link href={project.github} className={styles.link}>
                      <FiGithub />
                      GitHub
                    </Link>
                  )}
                  {project.demo && (
                    <Link href={project.demo} className={styles.link}>
                      <FiExternalLink />
                      Demo
                    </Link>
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
