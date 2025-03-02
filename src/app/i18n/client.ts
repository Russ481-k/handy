"use client";

import { useEffect } from "react";
import i18next from "i18next";
import {
  initReactI18next,
  useTranslation as useTranslationOrg,
  UseTranslationOptions,
} from "react-i18next";
import resourcesToBackend from "i18next-resources-to-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { getOptions, languages } from "./settings";
import { CustomTypeOptions } from "./types";

const runsOnServerSide = typeof window === "undefined";

i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(
    resourcesToBackend(
      (language: string, namespace: string) =>
        import(`./locales/${language}/${namespace}.json`)
    )
  )
  .init({
    ...getOptions(),
    lng: undefined,
    detection: {
      order: ["path", "htmlTag", "cookie", "navigator"],
    },
    preload: runsOnServerSide ? languages : [],
  });

type TranslationOptions = UseTranslationOptions & {
  returnObjects?: boolean;
  defaultValue?: string;
  count?: number;
};

export function useTranslation(
  lng: string,
  ns: keyof CustomTypeOptions["resources"] = "common",
  options: TranslationOptions & { keyPrefix?: string } = {}
) {
  const ret = useTranslationOrg(ns, options);
  const { i18n } = ret;

  useEffect(() => {
    if (!i18n.isInitialized && !runsOnServerSide) {
      i18n.changeLanguage(lng);
    }
  }, [lng, i18n]);

  return {
    t: ret.t as {
      <T>(key: string, options: { returnObjects: true; defaultValue: T }): T;
      (key: string, options?: { defaultValue?: string }): string;
    },
    i18n,
  };
}
