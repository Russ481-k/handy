import { getTranslation } from "@/app/i18n/server";
import { BaseProps, Feature } from "@/types/section";
import { FeaturesClient } from "./FeaturesClient";

interface FeaturesProps extends BaseProps {
  title?: string;
  features?: Feature[];
}

export async function Features({
  lng,
  title: customTitle,
  features: customFeatures,
}: FeaturesProps) {
  const { t } = await getTranslation(lng, "common");

  const featuresData =
    customFeatures ||
    Object.values(
      t("features.items", { returnObjects: true }) as unknown as Record<
        string,
        Feature
      >
    );

  const title = customTitle || t("features.title");

  return <FeaturesClient features={featuresData} title={title} />;
}
