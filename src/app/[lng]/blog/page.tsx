import { getBlogPosts } from "@/lib/api";
import { getTranslation } from "@/app/i18n/server";
import { BaseProps } from "@/types/section";
import { BlogSectionClient } from "@/components/blog/BlogSectionClient";

export default async function BlogPage({
  params,
}: {
  params: Promise<BaseProps>;
}) {
  const { lng } = await params;
  const { t } = await getTranslation(lng, "common");
  const { data: posts } = await getBlogPosts();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <BlogSectionClient
        posts={posts}
        title={t("blog_page.title")}
        subtitle={t("blog_page.subtitle")}
      />
    </div>
  );
}
