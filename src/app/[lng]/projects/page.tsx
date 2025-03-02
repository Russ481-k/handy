import { getProjects } from "@/lib/api";
import { BaseProps } from "@/types/section";
import { ProjectSectionClient } from "@/components/projects/ProjectSectionClient";
import { getTranslation } from "@/app/i18n/server";
import styles from "@/styles/modules/Projects.module.scss";
import { Project as SectionProject } from "@/types/section";
import { Project as ApiProject } from "@/types/project";

export default async function ProjectsPage({
  params,
}: {
  params: Promise<BaseProps>;
}) {
  const { lng } = await params;
  const { t } = await getTranslation(lng, "common");
  const { data: apiProjects } = await getProjects();

  // ApiProject 타입을 SectionProject 타입으로 변환
  const projects: SectionProject[] = apiProjects.map((project: ApiProject) => ({
    title: project.title,
    description: project.description,
    image: project.thumbnail,
    tags: project.technologies,
    github: project.githubUrl,
    demo: project.demoUrl,
  }));

  // 번역된 텍스트를 titles 객체로 구성
  const titles = {
    title: t("projects.title"),
    description: t("projects.description"),
  };

  return (
    <div className={styles.container}>
      <section className={styles.hero}>
        <h1>{titles.title}</h1>
        <p>{titles.description}</p>
      </section>
      <div className={styles.content}>
        <ProjectSectionClient projects={projects} titles={titles} />
      </div>
    </div>
  );
}
