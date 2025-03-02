import { getTranslation } from "@/app/i18n/server";
import { FeaturesClient } from "./FeaturesClient";
import { BaseProps, Feature } from "@/types/section";

export async function Features({ lng }: BaseProps) {
  const { t } = await getTranslation(lng, "common");

  const features: Feature[] = [
    {
      icon: "rocket",
      title: t("features.items.innovation.title"),
      description: t("features.items.innovation.description"),
    },
    {
      icon: "heart",
      title: t("features.items.customer.title"),
      description: t("features.items.customer.description"),
    },
    {
      icon: "trending-up",
      title: t("features.items.growth.title"),
      description: t("features.items.growth.description"),
    },
  ];

  return <FeaturesClient features={features} title={t("features.title")} />;
}
