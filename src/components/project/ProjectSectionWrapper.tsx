import { getTranslation } from "@/app/i18n/server";
import { ProjectSectionClient } from "./ProjectSectionClient";
import { Project } from "@/types/section";
import { BaseProps } from "@/types/section";

interface ProjectSectionWrapperProps extends BaseProps {
  projects: Project[];
}

export async function ProjectSectionWrapper({
  projects,
  lng,
}: ProjectSectionWrapperProps) {
  const { t } = await getTranslation(lng, "common");
  const titles = {
    title: t("projects.title"),
    description: t("projects.description"),
  };

  return <ProjectSectionClient projects={projects} titles={titles} />;
}
