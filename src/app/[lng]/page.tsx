import { getFeaturedProjects, getRecentBlogPosts } from "@/lib/api";
import { ProjectSectionWrapper } from "@/components/project/ProjectSectionWrapper";
import { HomeBlogSectionWrapper } from "@/components/blog/HomeBlogSectionWrapper";
import { Features } from "@/components/features/Features";
import { Teams } from "@/components/teams/Teams";
import { Hero } from "@/components/hero/Hero";
import { BaseProps } from "@/types/section";
import { getTranslation } from "@/app/i18n/server";
import styles from "@/styles/modules/home.module.scss";
import { Project as SectionProject } from "@/types/section";
import { Project as ApiProject } from "@/types/project";
import { WavySection } from "@/components/common/WavySection";

interface HomePageProps {
  params: Promise<BaseProps>;
}

export default async function HomePage({ params }: HomePageProps) {
  const { lng } = await params;
  const apiProjects = await getFeaturedProjects(3);
  const posts = await getRecentBlogPosts(3);
  const { t } = await getTranslation(lng, "common");

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
    <div className={styles.home}>
      <main className={styles.main}>
        <Hero title={t("hero.title")} description={t("hero.description")} />
        <div className={styles.content}>
          <WavySection
            className={styles.section}
            contentClassName={styles.container}
          >
            <Features lng={lng} />
          </WavySection>
          <Teams lng={lng} />
          <WavySection
            className={styles.section}
            contentClassName={styles.container}
          >
            {/* <ProjectSectionWrapper projects={projects} lng={lng} /> */}
            <HomeBlogSectionWrapper posts={posts} lng={lng} />
          </WavySection>
        </div>
      </main>
    </div>
  );
}
