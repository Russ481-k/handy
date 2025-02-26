"use client";

import i18next from "i18next";
import {
  initReactI18next,
  useTranslation as useTranslationOrg,
  UseTranslationOptions,
} from "react-i18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { getOptions } from "./settings";
import { CustomTypeOptions } from "./types";

i18next
  .use(initReactI18next)
  .use(
    resourcesToBackend(
      (language: string, namespace: string) =>
        import(`./locales/${language}/${namespace}.json`)
    )
  )
  .init(getOptions());

type RecursiveKeyOf<TObj extends object> = {
  [TKey in keyof TObj & (string | number)]: TObj[TKey] extends []
    ? `${TKey}` | `${TKey}.${number}` | `${TKey}.${number}.${string}`
    : TObj[TKey] extends object
    ? `${TKey}` | `${TKey}.${RecursiveKeyOf<TObj[TKey]>}`
    : `${TKey}`;
}[keyof TObj & (string | number)];

type TranslationKey = RecursiveKeyOf<CustomTypeOptions["resources"]["common"]>;

type TranslationOptions = UseTranslationOptions & {
  returnObjects?: boolean;
  defaultValue?: string;
  count?: number;
};

export function useTranslation(
  lng: string,
  ns: keyof CustomTypeOptions["resources"] = "common",
  options: TranslationOptions = {}
) {
  if (i18next.resolvedLanguage !== lng) i18next.changeLanguage(lng);
  const { t, i18n } = useTranslationOrg(ns, options as UseTranslationOptions);

  return {
    t: t as unknown as {
      <T = string>(
        key: TranslationKey,
        options: { returnObjects: true } & TranslationOptions
      ): T;
      (key: TranslationKey, options?: TranslationOptions): string;
    },
    i18n,
  };
}
