import { useState, VFC } from 'react';
import { hot } from 'react-hot-loader/root';
import styled from 'styled-components';

import { Barber, Brand, Shop } from '@app/apps';
import { ChangeUserType } from '@app/ChangeUserType';
import { useToggle } from '@app/hooks';

import { BASE_NAMES } from './constants';
import type { UserType } from './types';
import { userTypeByUrl } from './utils';

interface AppProps {
  basename?: string;
  className?: string;
}

const initialUserType = userTypeByUrl();

const Buttons = styled.div`
  display: flex;
  flex-direction: column;
  width: 100px;
`;

const App: VFC<AppProps> = () => {
  const [userType, setUserType] = useState<UserType>(initialUserType);
  const [sidebarActive, toggleSidebar] = useToggle(false);
  const [isContainerAppActive, toggleContainerApp] = useToggle(false);

  const baseName = BASE_NAMES[userType];

  return (
    <>
      <Buttons>
        <ChangeUserType setUserType={setUserType} userType={userType} />
        <button
          style={{ background: sidebarActive ? 'blue' : '' }}
          onClick={() => toggleSidebar()}
        >
          Sidebar
        </button>
        <button
          style={{ background: isContainerAppActive ? 'blue' : '' }}
          onClick={() => toggleContainerApp()}
        >
          ContainerApp
        </button>
      </Buttons>
      {userType === 'barber' && (
        <Barber
          basename={baseName}
          isContainerAppActive={isContainerAppActive}
          toggleSidebar={toggleSidebar}
        />
      )}
      {userType === 'brand' && (
        <Brand
          basename={baseName}
          isContainerAppActive={isContainerAppActive}
          toggleSidebar={toggleSidebar}
        />
      )}
      {userType === 'shop' && (
        <Shop
          basename={baseName}
          isContainerAppActive={isContainerAppActive}
          toggleSidebar={toggleSidebar}
        />
      )}
      {userType === 'admin' && <div>Please select the role</div>}
    </>
  );
};

export default hot(App);
