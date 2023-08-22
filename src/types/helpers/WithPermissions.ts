import { Permissions } from '@app/types';

export type WithPermissions<T = {}> = T & {
  permissions: Permissions;
};
