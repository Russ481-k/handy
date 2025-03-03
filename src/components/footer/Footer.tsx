import { getTranslation } from "@/app/i18n/server";
import { FooterClient } from "./FooterClient";

export default async function Footer({ lng }: { lng: string }) {
  const { t } = await getTranslation(lng, "common");

  const footerData = {
    slogan: t("footer.slogan"),
    links: {
      social: [
        { name: "GitHub", url: "https://github.com", icon: "github" },
        { name: "Twitter", url: "https://twitter.com", icon: "twitter" },
        { name: "LinkedIn", url: "https://linkedin.com", icon: "linkedin" },
        { name: "Instagram", url: "https://instagram.com", icon: "instagram" },
        { name: "Email", url: "mailto:contact@handy.com", icon: "mail" },
      ],
      legal: [
        { name: t("footer.privacyPolicy"), url: `/${lng}/privacy` },
        { name: t("footer.termsOfService"), url: `/${lng}/terms` },
        { name: t("footer.legal"), url: `/${lng}/legal` },
      ],
    },
    copyright: t("footer.copyright"),
  };

  return <FooterClient {...footerData} />;
}
