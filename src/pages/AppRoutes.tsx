import { datadogRum } from '@datadog/browser-rum';
import { useEffect, VFC } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { GuardedRoute } from '@getsquire/glue-ui';

import { usePropagateUserToLogs, useServiceApp } from '@app/hooks';
import { ErrorBoundaryRoute } from '@app/components';
import { appRoutes } from '@app/config';
import {
  AddCategoryPage,
  AddServicePage,
  CategoriesPage,
  EditAssignmentPage,
  EditCategoryPage,
  EditServicePage,
  ServicesPage,
} from '@app/pages';
import { CommanderContainerProps } from '@app/interfaces';

export const AppRoutes: VFC<CommanderContainerProps> = ({
  isContainerAppActive,
  toggleSidebar,
}) => {
  const location = useLocation();
  const { features } = useServiceApp();
  const {
    canAssignService,
    canModifyCategories,
    canModifyServices,
    canOpenCategories,
  } = features;

  usePropagateUserToLogs();

  useEffect(() => {
    datadogRum.startView(location.pathname);
  }, [location.pathname]);

  return (
    <Routes>
      <Route element={<ErrorBoundaryRoute />}>
        <Route index element={<ServicesPage />} />
        <Route
          element={
            <GuardedRoute allowed={canOpenCategories} fallbackRoute={appRoutes.root} />
          }
        >
          <Route
            element={
              <CategoriesPage
                isContainerAppActive={isContainerAppActive}
                toggleSidebar={toggleSidebar}
              />
            }
            path={appRoutes.categories}
          />
        </Route>
        <Route
          element={
            <GuardedRoute allowed={canModifyCategories} fallbackRoute={appRoutes.root} />
          }
        >
          <Route
            element={
              <AddCategoryPage
                isContainerAppActive={isContainerAppActive}
                toggleSidebar={toggleSidebar}
              />
            }
            path={appRoutes.addCategory}
          />
          <Route
            element={
              <EditCategoryPage
                isContainerAppActive={isContainerAppActive}
                toggleSidebar={toggleSidebar}
              />
            }
            path={appRoutes.editCategory}
          />
        </Route>
        <Route
          element={
            <GuardedRoute allowed={canModifyServices} fallbackRoute={appRoutes.root} />
          }
        >
          <Route
            element={
              <AddServicePage
                isContainerAppActive={isContainerAppActive}
                toggleSidebar={toggleSidebar}
              />
            }
            path={appRoutes.addService}
          />
          <Route
            element={
              <EditServicePage
                isContainerAppActive={isContainerAppActive}
                toggleSidebar={toggleSidebar}
              />
            }
            path={appRoutes.editService}
          />
        </Route>
        <Route
          element={
            <GuardedRoute allowed={canAssignService} fallbackRoute={appRoutes.root} />
          }
        >
          <Route
            element={
              <EditAssignmentPage
                isContainerAppActive={isContainerAppActive}
                toggleSidebar={toggleSidebar}
              />
            }
            path={appRoutes.editServiceAssignment}
          />
        </Route>
      </Route>
    </Routes>
  );
};
