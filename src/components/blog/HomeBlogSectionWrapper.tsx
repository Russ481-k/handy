import { getTranslation } from "@/app/i18n/server";
import { HomeBlogSection } from "./HomeBlogSection";
import { BlogPost } from "@/types/blog";
import { BaseProps } from "@/types/section";

interface HomeBlogSectionProps extends BaseProps {
  posts: BlogPost[];
}

export async function HomeBlogSectionWrapper({
  posts,
  lng,
}: HomeBlogSectionProps) {
  const { t } = await getTranslation(lng, "common");
  const title = t("blog.title");

  return <HomeBlogSection posts={posts} title={title} />;
}
