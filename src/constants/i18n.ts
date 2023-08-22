export type LocalizationObject = { [key: string]: string };

export const LOCALIZATION_BY_COUNTRY: LocalizationObject = {
  Canada: 'fr',
};

export const LANGUAGE_BY_LOCALIZATION: LocalizationObject = {
  fr: 'Français',
};

export enum LanguageCode {
  en = 'en',
  fr = 'fr',
}
