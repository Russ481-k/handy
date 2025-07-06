import { useTranslation } from "@/app/i18n";
import { ProjectSectionWrapper } from "@/components/project/ProjectSectionWrapper";
import { Project as SectionProject } from "@/types/section";
import { Project as ApiProject } from "@/types/project";
import { Hero } from "@/components/hero/Hero";
import { getProjects } from "@/lib/api";
import { WavySection } from "@/components/common/WavySection";
import styles from "@/styles/modules/about.module.scss";

interface ProjectsPageProps {
  params: {
    lng: string;
  };
}

export default async function ProjectsPage({
  params: { lng },
}: ProjectsPageProps) {
  const { t } = await useTranslation(lng);

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

  return (
    <main>
      <Hero
        title={t("projects.title")}
        description={t("projects.description")}
      />
      <WavySection
        className={styles.waveTop}
        contentClassName={styles.container}
      >
        <ProjectSectionWrapper lng={lng} projects={projects} />
      </WavySection>
    </main>
  );
}
