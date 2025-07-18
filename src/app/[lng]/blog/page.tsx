import { getBlogPosts } from "@/lib/api";
import { getTranslation } from "@/app/i18n/server";
import { BaseProps } from "@/types/section";
import { BlogSectionClient } from "@/components/blog/BlogSectionClient";
import styles from "@/styles/modules/blog.module.scss";
import { Hero } from "@/components/hero/Hero";

export default async function BlogPage({
  params,
}: {
  params: Promise<BaseProps>;
}) {
  const { lng } = await params;
  const { t } = await getTranslation(lng, "common");
  const { data: posts } = await getBlogPosts();

  // 번역된 텍스트를 titles 객체로 구성
  const titles = {
    title: t("blog_page.title"),
    description: t("blog_page.subtitle"),
  };

  return (
    <div className={styles.container}>
      <Hero title={t("blog.title")} description={t("blog.description")} />
      <div className={styles.content}>
        <BlogSectionClient posts={posts} titles={titles} />
      </div>
    </div>
  );
}
