import { getTranslation } from "@/app/i18n/server";
import { BaseProps } from "@/types/section";
import type { Teams as TeamType } from "@/types/section";
import { TeamsClient } from "./TeamsClient";

interface TeamsProps extends BaseProps {
  isPage?: boolean;
}

export async function Teams({ lng, isPage = false }: TeamsProps) {
  const { t } = await getTranslation(lng, "common");

  const teams: TeamType[] = [
    {
      name: t("team.items.ceo.name"),
      role: t("team.items.ceo.role"),
      description: t("team.items.ceo.description"),
      image: "/team/ceo.jpg",
    },
    {
      name: t("team.items.cfo.name"),
      role: t("team.items.cfo.role"),
      description: t("team.items.cfo.description"),
      image: "/team/cfo.jpg",
    },
    {
      name: t("team.items.cto.name"),
      role: t("team.items.cto.role"),
      description: t("team.items.cto.description"),
      image: "/team/cto.jpg",
    },
  ];

  // 번역된 텍스트를 titles 객체로 구성하여 전달
  const titles = {
    about: t("about.title"),
    mission: {
      title: t("about.mission.title"),
      description: t("about.mission.description"),
    },
    vision: {
      title: t("about.vision.title"),
      description: t("about.vision.description"),
    },
    team: t("about.team.title"),
  };

  return <TeamsClient teams={teams} titles={titles} isPage={isPage} />;
}
