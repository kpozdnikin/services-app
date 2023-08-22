import * as yup from 'yup';
import { createContext } from 'react';

export interface YupContextValue {
  yup: typeof yup;
}

export const YupContext = createContext<YupContextValue>({
  yup,
});
