import { VFC } from 'react';

import { CommanderContainerProps } from '@app/interfaces';

import { AppContainer } from '../AppContainer';
import { BrandApp } from './BrandApp';

interface AppProps extends CommanderContainerProps {
  basename?: string;
  className?: string;
}

export const Brand: VFC<AppProps> = ({
  basename,
  isContainerAppActive,
  toggleSidebar,
}) => (
  <AppContainer basename={basename}>
    <BrandApp isContainerAppActive={isContainerAppActive} toggleSidebar={toggleSidebar} />
  </AppContainer>
);

export default Brand;
