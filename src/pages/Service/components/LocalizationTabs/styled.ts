import styled, { css } from 'styled-components';

const border = css`
  border: 1px solid #ebebf5;

  @media (prefers-color-scheme: dark) {
    border: 1px solid #3a3a3c;
  }
`;

export const LocalizationTab = styled.div<{ isActive?: boolean }>`
  all: unset;
  position: relative;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  gap: 10px;
  align-items: center;
  padding: 12px;
  cursor: pointer;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: -0.01em;
  max-height: 40px;
  min-width: 40px;
  color: #8e8e93;

  ${border}

  border-bottom: unset;

  &:not(:last-child) {
    border-right: unset;
  }

  ${(props) =>
    props.isActive &&
    css`
      color: #1c1c1e;

      @media (prefers-color-scheme: dark) {
        color: white;
      }
    `}
`;

export const LocalizationTabsTabsArea = styled.div`
  display: flex;
`;

export const LocalizationTabsContentArea = styled.div`
  padding: 24px;
  border-radius: 0 0 4px 4px;

  ${border}
`;

export const LanguageButton = styled.button`
  all: unset;
  display: flex;
  justify-content: space-between;
  gap: 10px;
`;

export const RemoveLanguageButton = styled.button`
  all: unset;
`;

export const LanguageDropdownItem = styled.div`
  padding: 20px 16px;
  min-width: 176px;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: -0.01em;
`;

export const LocalizationTabsDropdown = styled.div`
  position: absolute;
  top: calc(100% + 1px);
  left: 0;
`;
