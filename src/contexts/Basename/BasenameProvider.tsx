import { FC } from 'react';

import { BasenameContext } from './BasenameContext';

export type BasenameContextProviderProps = {
  basename?: string;
};

export const BasenameProvider: FC<BasenameContextProviderProps> = ({
  basename,
  children,
}) => {
  return <BasenameContext.Provider value={basename}>{children}</BasenameContext.Provider>;
};
