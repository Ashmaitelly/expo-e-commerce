export type LanguageCode = "en" | "ar";

export interface LanguageConfig {
  rtl: boolean;
}

export const languages: Record<LanguageCode, LanguageConfig> = {
  en: { rtl: false },
  ar: { rtl: true },
};
