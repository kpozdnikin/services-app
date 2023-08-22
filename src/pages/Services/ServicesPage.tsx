import { VFC } from 'react';
import { LoadingOverlay } from '@getsquire/glue-ui';

import {
  useCommanderNavigation,
  useServiceApp,
  useCategoriesListQuery,
  useTaxesQuery,
  useTranslator,
} from '@app/hooks';
import { appRoutes, config } from '@app/config';

import { useServicesListQuery, useServicesListExport } from './hooks';
import { ServicesList } from './components';

export const ServicesPage: VFC = () => {
  const { features } = useServiceApp();
  // preload service categories
  useCategoriesListQuery(
    config.defaultServiceCategoriesLimit,
    config.defaultServiceCategoriesSkip,
  );
  // preload taxes
  useTaxesQuery();
  const servicesQuery = useServicesListQuery();
  const { exportToCsv, loading } = useServicesListExport();
  const handleNavigateClick = useCommanderNavigation();
  const t = useTranslator();

  if (servicesQuery.status === 'loading') {
    return <LoadingOverlay status="loading" />;
  }

  return (
    <div data-automation-id="services-page">
      <div
        className={`o-flexbox${
          !features?.canOpenCategories ? ' o-flexbox--justify-end' : ''
        }`}
      >
        {features?.canOpenCategories && (
          <a
            className="c-btn c-btn--medium"
            href={appRoutes.categories}
            data-automation-id="categories-button"
            onClick={(e) => handleNavigateClick(appRoutes.categories, e)}
          >
            {t('pages.services.buttons.categories')}
          </a>
        )}
        <div className="o-flexbox">
          {features?.canViewServices && (
            <button
              data-automation-id="export-to-csv-button"
              disabled={loading}
              className="c-btn c-btn--medium"
              onClick={exportToCsv}
            >
              {t('pages.services.buttons.exportToCsv')}
            </button>
          )}
          {features?.canModifyServices && (
            <a
              className="c-btn c-btn--medium u-ml-"
              data-automation-id="add-service-button"
              href={appRoutes.addService}
              onClick={(e) => handleNavigateClick(appRoutes.addService, e)}
            >
              {t('pages.services.buttons.addService')}
            </a>
          )}
        </div>
      </div>

      {servicesQuery.status === 'success' &&
        servicesQuery.data &&
        servicesQuery.data?.length > 0 && <ServicesList services={servicesQuery.data} />}

      {servicesQuery.status === 'success' && servicesQuery.data?.length === 0 && (
        <div className="c-heading c-heading--small u-mt">
          {t('pages.services.emptyMessage')}
        </div>
      )}
    </div>
  );
};
