import React, { FC } from 'react';
import { noop, sortBy, isNil, negate } from 'lodash';

import { CrossSign, LanguageGlobe } from '@app/assets/icons';
import { LanguageCode } from '@app/constants';

import { AddTranslationButton } from './AddTranslationButton';
import {
  LanguageButton,
  LocalizationTab,
  LocalizationTabsContentArea,
  LocalizationTabsTabsArea,
  RemoveLanguageButton,
} from './styled';
import { LanguageWithDescription } from './types';

const supportedLanguages: LanguageWithDescription[] = [
  {
    value: LanguageCode.en,
    description: 'English',
  },
  {
    value: LanguageCode.fr,
    description: 'Français',
  },
];

export interface LocalizationTabsProps {
  selectedLanguagesCodes: LanguageCode[];
  supportedLanguagesCodes: LanguageCode[];
  currentLanguageCode: LanguageCode;
  defaultLanguageCode: LanguageCode;
  onAddLanguage?: (language: LanguageCode) => void;
  onRemoveLanguage?: (language: LanguageCode) => void;
  onChangeCurrentLanguage?: (language: LanguageCode) => void;
}

const isPresent = <T extends unknown>(value: T | null | undefined): value is T =>
  negate(isNil)(value);

export const LocalizationTabs: FC<LocalizationTabsProps> = ({
  children,
  selectedLanguagesCodes,
  supportedLanguagesCodes,
  currentLanguageCode,
  defaultLanguageCode,
  onAddLanguage = noop,
  onRemoveLanguage = noop,
  onChangeCurrentLanguage = noop,
}) => {
  const availableLanguages = supportedLanguagesCodes
    .map((languageCode) => supportedLanguages.find(({ value }) => value === languageCode))
    .filter(isPresent)
    .map((language) => ({
      ...language,
      isDefault: language.value === defaultLanguageCode,
    }));

  const restLanguages = availableLanguages.filter(({ value }) =>
    selectedLanguagesCodes.every((code) => code !== value),
  );

  const selectedLanguages = sortBy(
    selectedLanguagesCodes
      .map((languageCode) =>
        availableLanguages.find(({ value }) => value === languageCode),
      )
      .filter(isPresent),
    (language) => (defaultLanguageCode === language.value ? -1 : 1), // default language first
  );

  return (
    <div>
      <LocalizationTabsTabsArea>
        {selectedLanguages.map((language) => (
          <LocalizationTab
            key={language.value}
            isActive={currentLanguageCode === language.value}
          >
            <LanguageButton
              type="button"
              onClick={() => onChangeCurrentLanguage(language.value)}
            >
              <LanguageGlobe />
              {language.description}
            </LanguageButton>
            {!language.isDefault && (
              <RemoveLanguageButton
                type="button"
                onClick={() => {
                  onRemoveLanguage(language.value);
                  onChangeCurrentLanguage(
                    selectedLanguages[0] && selectedLanguages[0].value,
                  );
                }}
              >
                <CrossSign />
              </RemoveLanguageButton>
            )}
          </LocalizationTab>
        ))}
        {!!restLanguages.length && (
          <AddTranslationButton
            languages={restLanguages}
            onAdd={(language) => {
              onAddLanguage(language.value);
              onChangeCurrentLanguage(language.value);
            }}
          />
        )}
      </LocalizationTabsTabsArea>
      <LocalizationTabsContentArea>{children}</LocalizationTabsContentArea>
    </div>
  );
};
