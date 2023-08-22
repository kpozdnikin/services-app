import { FC, ReactNode } from 'react';

interface PrimaryHeaderProps {
  children: ReactNode;
  isContainerAppActive: boolean;
  toggleSidebar: (sidebarOpened: boolean) => void;
}

// isContainerActive - the prop is because of https://squire.atlassian.net/browse/SA-4068

export const PrimaryHeader: FC<PrimaryHeaderProps> = ({
  children,
  isContainerAppActive,
  toggleSidebar,
}) => {
  const openSideBar = () => {
    toggleSidebar(true);
  };

  return (
    <header className="c-header-primary c-header-primary--inner-page">
      {!isContainerAppActive && (
        <div className="c-hamburger" onClick={openSideBar}>
          <div className="c-header-primary__item">
            <span className="c-mobile-nav" />
          </div>
        </div>
      )}
      {children}
      <div className="c-primary-header-controls js-primary-header-controls" />
    </header>
  );
};
