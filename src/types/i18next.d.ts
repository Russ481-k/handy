import "i18next";
{
  interface CustomTypeOptions {
    defaultNS: "common";
    resources: {
      common: typeof import("../app/i18n/locales/ko/common.json");
    };
  }
}
