import { getTranslation } from "@/app/i18n/server";
import { BlogSectionClient } from "./BlogSectionClient";
import { BlogPost } from "@/types/blog";
import { BaseProps } from "@/types/section";

interface BlogSectionProps extends BaseProps {
  posts: BlogPost[];
}

export async function BlogSection({ posts, lng }: BlogSectionProps) {
  const { t } = await getTranslation(lng, "common");
  const title = t("blog_page.title");
  const subtitle = t("blog_page.subtitle");

  return <BlogSectionClient posts={posts} title={title} subtitle={subtitle} />;
}
