"use client";

import { motion } from "framer-motion";
import { ProjectCard } from "./ProjectCard";
import { Project } from "@/types/project";
import styles from "@/styles/modules/project-section.module.scss";

interface ProjectSectionClientProps {
  projects: Project[];
  title: string;
  subtitle?: string;
  isPage?: boolean;
}

export function ProjectSectionClient({
  projects,
  title,
  subtitle,
  isPage = false,
}: ProjectSectionClientProps) {
  return (
    <section className={styles.projectSection}>
      <div className={styles.container}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={styles.header}
        >
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.subtitle}>
            {subtitle || "혁신적인 프로젝트들을 소개합니다."}
          </p>
        </motion.div>
        <div className={styles.grid}>
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className={styles.projectCard}
            >
              <ProjectCard
                project={project}
                className={isPage ? styles.pageCard : ""}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
