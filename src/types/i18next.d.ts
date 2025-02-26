import "i18next";
{
  export interface CustomTypeOptions {
    defaultNS: "common";
    resources: {
      common: typeof import("../app/i18n/locales/ko/common.json");
    };
  }
}
