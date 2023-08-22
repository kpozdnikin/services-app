import { VFC } from 'react';

import { CommanderContainerProps } from '@app/interfaces';

import { AppContainer } from '../AppContainer';
import { BarberApp } from './BarberApp';

interface AppProps extends CommanderContainerProps {
  basename?: string;
  className?: string;
}

export const Barber: VFC<AppProps> = ({
  basename,
  isContainerAppActive,
  toggleSidebar,
}) => (
  <AppContainer basename={basename}>
    <BarberApp
      isContainerAppActive={isContainerAppActive}
      toggleSidebar={toggleSidebar}
    />
  </AppContainer>
);

export default Barber;
