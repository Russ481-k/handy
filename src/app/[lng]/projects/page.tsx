"use client";

import { useState, use } from "react";
import Image from "next/image";
import { useTranslation } from "../../i18n/client";
import styles from "./projects.module.scss";
import type { CustomTypeOptions } from "../../i18n/types";

type Project =
  CustomTypeOptions["resources"]["common"]["projects_page"]["items"][number];

export default function ProjectsPage({
  params,
}: {
  params: Promise<{ lng: string }>;
}) {
  const { lng } = use(params);
  const { t } = useTranslation(lng, "common");
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = [
    { id: "all", label: t("projects_page.categories.all") },
    { id: "web", label: t("projects_page.categories.web") },
    { id: "mobile", label: t("projects_page.categories.mobile") },
    { id: "ai", label: t("projects_page.categories.ai") },
  ];

  const projects = t<Project[]>("projects_page.items", {
    returnObjects: true,
  });

  const filteredProjects =
    activeCategory === "all"
      ? projects
      : projects.filter((project) => project.category === activeCategory);

  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <h1>{t("projects_page.title")}</h1>
        <p>{t("projects_page.subtitle")}</p>
      </section>

      <section className={styles.projects}>
        <div className={styles.categories}>
          {categories.map((category) => (
            <button
              key={category.id}
              className={`${styles.categoryButton} ${
                activeCategory === category.id ? styles.active : ""
              }`}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.label}
            </button>
          ))}
        </div>

        <div className={styles.grid}>
          {filteredProjects.map((project, index) => (
            <div key={index} className={styles.projectCard}>
              <div className={styles.imageContainer}>
                <Image
                  src={project.image}
                  alt={project.title}
                  width={600}
                  height={400}
                  className={styles.image}
                />
              </div>
              <div className={styles.content}>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className={styles.tags}>
                  {project.tags.map((tag, tagIndex) => (
                    <span key={tagIndex} className={styles.tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
