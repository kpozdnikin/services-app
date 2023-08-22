import React, { FC, useRef, useState } from 'react';
import { noop } from 'lodash';

import { PlusSign } from '@app/assets/icons';
import { Dropdown, DropdownListItem } from '@app/components';

import { useClickOutside } from './useClickOutside';
import {
  LanguageDropdownItem,
  LocalizationTab,
  LocalizationTabsDropdown,
} from './styled';
import { LanguageWithDescription } from './types';

export interface AddTranslationButtonProps {
  languages: LanguageWithDescription[];
  onAdd: (language: LanguageWithDescription) => void;
}

export const AddTranslationButton: FC<AddTranslationButtonProps> = ({
  languages = [],
  onAdd = noop,
}) => {
  const dropdownRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  useClickOutside(dropdownRef, () => {
    if (isOpen) {
      setIsOpen(false);
    }
  });

  return (
    <LocalizationTab
      ref={dropdownRef}
      as="button"
      type="button"
      onClick={() => setIsOpen(!isOpen)}
    >
      <PlusSign />
      <LocalizationTabsDropdown>
        <Dropdown alignment="bottom">
          {isOpen &&
            languages.map((language) => (
              <DropdownListItem key={language.value} onClick={() => onAdd?.(language)}>
                <LanguageDropdownItem>{language.description}</LanguageDropdownItem>
              </DropdownListItem>
            ))}
        </Dropdown>
      </LocalizationTabsDropdown>
    </LocalizationTab>
  );
};
