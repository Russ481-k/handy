import { getFeaturedProjects, getRecentBlogPosts } from "@/lib/api";
import { ProjectSection } from "@/components/project/ProjectSection";
import { HomeBlogSectionWrapper } from "@/components/blog/HomeBlogSectionWrapper";
import { Features } from "@/components/features/Features";
import { Teams } from "@/components/teams/Teams";
import { BaseProps } from "@/types/section";
import { getTranslation } from "@/app/i18n/server";
import styles from "@/styles/modules/Home.module.scss";

interface HomePageProps {
  params: Promise<BaseProps>;
}

export default async function HomePage({ params }: HomePageProps) {
  const { lng } = await params;
  const projects = await getFeaturedProjects(3);
  const posts = await getRecentBlogPosts(3);
  const { t } = await getTranslation(lng, "common");

  return (
    <div className={styles.home}>
      <main className={styles.main}>
        <section className={styles.hero}>
          <h1>{t("hero.title")}</h1>
          <p>{t("hero.description")}</p>
        </section>
        <div className={styles.content}>
          <Features lng={lng} />
          <Teams lng={lng} />
          <ProjectSection projects={projects} lng={lng} />
          <HomeBlogSectionWrapper posts={posts} lng={lng} />
        </div>
      </main>
    </div>
  );
}
