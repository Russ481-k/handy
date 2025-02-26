export const fallbackLng = "ko";
export const languages = [fallbackLng, "en"] as const;
export type Locale = (typeof languages)[number];

export const defaultNS = "common";

export function getOptions(lng = fallbackLng, ns = defaultNS) {
  return {
    supportedLngs: languages,
    fallbackLng,
    lng,
    fallbackNS: defaultNS,
    defaultNS,
    ns,
  };
}
