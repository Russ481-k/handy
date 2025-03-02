import { getTranslation } from "@/app/i18n/server";
import { ProjectSectionClient } from "./ProjectSectionClient";
import { Project } from "@/types/project";
import { BaseProps } from "@/types/section";

interface ProjectSectionProps extends BaseProps {
  projects: Project[];
  isPage?: boolean;
}

export async function ProjectSection({
  projects,
  lng,
  isPage = true,
}: ProjectSectionProps) {
  const { t } = await getTranslation(lng, "common");
  const title = t("projects_page.title");
  const subtitle = t("projects_page.subtitle");

  return (
    <ProjectSectionClient
      projects={projects}
      title={title}
      subtitle={subtitle}
      isPage={isPage}
    />
  );
}
