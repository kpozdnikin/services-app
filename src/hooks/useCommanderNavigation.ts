import { MouseEvent, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { showLocalHeader } from '@app/config';
import { navigateToCommander } from '@app/utils';
import { BasenameContext } from '@app/contexts';

export const useCommanderNavigation = () => {
  const navigate = useNavigate();
  const basename = useContext(BasenameContext);

  return (url: string, e?: MouseEvent<HTMLElement>) => {
    e?.preventDefault();

    if (!showLocalHeader) {
      navigateToCommander(`${basename}${url}`);
    }

    navigate(url);
  };
};
