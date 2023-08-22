import { createPermissionChecker } from '@getsquire/sage/permissions/utils';

import { ApiInitialConfig } from '@app/interfaces';
import { PathsToLeaves, Permissions, WithPermissions } from '@app/types';
import { USER_KIND_BARBER, USER_KIND_BRAND } from '@app/constants';

export const permissionChecker = (
  view: WithPermissions,
  path: PathsToLeaves<typeof Permissions>,
): boolean => {
  if (view?.permissions) {
    const checker = createPermissionChecker(path as PathsToLeaves<typeof Permissions>);

    return checker(view.permissions as Permissions);
  }

  return false;
};

export const getPermissions = (initialConfig: ApiInitialConfig) => {
  const isBrandUser = initialConfig?.userKind === USER_KIND_BRAND;

  const canAddServices = permissionChecker(
    (initialConfig.view as unknown) as WithPermissions,
    'services.add' as PathsToLeaves<typeof Permissions>,
  );
  const canOpenServices = permissionChecker(
    (initialConfig.view as unknown) as WithPermissions,
    'services.modify' as PathsToLeaves<typeof Permissions>,
  );
  const canModifyServices = permissionChecker(
    (initialConfig.view as unknown) as WithPermissions,
    'services.modify' as PathsToLeaves<typeof Permissions>,
  );
  const canViewServices = permissionChecker(
    (initialConfig.view as unknown) as WithPermissions,
    'services.view' as PathsToLeaves<typeof Permissions>,
  );

  // barber cannot visit/edit/delete categories
  const isNotBarber = initialConfig?.userKind !== USER_KIND_BARBER;
  const canOpenCategories = isNotBarber && canViewServices && canModifyServices;
  const canModifyCategories = isNotBarber && canViewServices && canModifyServices;

  const canSortServices = canOpenServices && !isBrandUser;

  return {
    canAddServices,
    canModifyServices,
    canModifyCategories,
    canOpenCategories,
    canOpenServices,
    canSortServices,
    canViewServices,
  };
};
