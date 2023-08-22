import { Button } from '@getsquire/glue-ui';
import { ComponentProps } from 'react';

export type ButtonType = {
  variant: ComponentProps<typeof Button>['variant'] | 'danger';
  type: 'cancel' | 'ok';
  text: string;
};
