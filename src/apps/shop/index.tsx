import { VFC } from 'react';

import { CommanderContainerProps } from '@app/interfaces';

import { AppContainer } from '../AppContainer';
import { ShopApp } from './ShopApp';

interface AppProps extends CommanderContainerProps {
  basename?: string;
  className?: string;
}

export const Shop: VFC<AppProps> = ({
  basename,
  isContainerAppActive,
  toggleSidebar,
}) => (
  <AppContainer basename={basename}>
    <ShopApp isContainerAppActive={isContainerAppActive} toggleSidebar={toggleSidebar} />
  </AppContainer>
);

export default Shop;
