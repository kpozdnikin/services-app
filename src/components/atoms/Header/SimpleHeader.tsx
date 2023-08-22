import { FC, ReactNode } from 'react';

import { PrimaryHeader } from './PrimaryHeader';

interface SimpleHeaderProps {
  children?: ReactNode;
  heading: string;
  isContainerAppActive: boolean;
  toggleSidebar: (sidebarOpened: boolean) => void;
}

// isContainerActive - the prop is because of https://squire.atlassian.net/browse/SA-4068

export const SimpleHeader: FC<SimpleHeaderProps> = ({
  children,
  heading,
  isContainerAppActive,
  toggleSidebar,
}) => {
  return (
    <PrimaryHeader
      isContainerAppActive={isContainerAppActive}
      toggleSidebar={toggleSidebar}
    >
      {!isContainerAppActive && (
        <div className="c-header-primary__item u-position-relative large-and-up-ph small-ph-- u-pv-">
          <div className="c-heading c-heading--dark c-heading--main-header">
            {heading}
          </div>
        </div>
      )}
      {/* Prevent layout breaking for container app */}
      {isContainerAppActive && <div />}
      {children}
    </PrimaryHeader>
  );
};
