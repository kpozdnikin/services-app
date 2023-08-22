import { VFC, useState } from 'react';
import { DataNavigator, LoadingOverlay } from '@getsquire/glue-ui';

import { appRoutes, config } from '@app/config';
import { CommanderContainerProps } from '@app/interfaces';
import {
  useCommanderNavigation,
  useCategoriesListQuery,
  useTranslator,
  useServiceApp,
} from '@app/hooks';

import { CategoriesList } from './components';

export const CategoriesPage: VFC<CommanderContainerProps> = () => {
  const { features } = useServiceApp();
  const { canModifyCategories } = features;
  const [limit, setLimit] = useState<number>(config.defaultServiceCategoriesLimit);
  const [skip, setSkip] = useState<number>(config.defaultServiceCategoriesSkip);
  const categoriesQuery = useCategoriesListQuery(limit, skip);
  const handleNavigateClick = useCommanderNavigation();
  const categories = categoriesQuery.data?.rows ?? [];
  const count = categories.length;
  const t = useTranslator();

  const onNext = () => {
    setSkip((prevSkip) => prevSkip + limit);
  };

  const onPrev = () => {
    setSkip((prevSkip) => prevSkip - limit);
  };

  const onItemsPerPageChange = (perPage: number) => {
    setLimit(perPage);
  };

  if (categoriesQuery.status === 'loading') {
    return <LoadingOverlay status="loading" />;
  }

  return (
    <div className="u-width-100" data-automation-id="categories-page">
      <div className="u-max-width-710 u-margin-auto u-mv-">
        <div className="o-flexbox">
          <a
            className="c-btn c-btn--medium u-width-120"
            href="/"
            data-automation-id="services-button"
            onClick={(e) => handleNavigateClick('/', e)}
          >
            <span className="c-btn__text">{t('pages.categories.buttons.services')}</span>
          </a>
          {canModifyCategories && (
            <a
              className="c-btn c-btn--medium"
              href={appRoutes.addCategory}
              data-automation-id="add-category-button"
              onClick={(e) => handleNavigateClick(appRoutes.addCategory, e)}
            >
              <span className="c-btn__text">
                {t('pages.categories.buttons.addCategory')}
              </span>
            </a>
          )}
        </div>

        {!!categoriesQuery.data && <CategoriesList categories={categories} />}

        {count > 50 && (
          <DataNavigator
            count={count}
            itemsPerPage={limit}
            offset={skip}
            prevDisabled={skip - limit < 0}
            nextDisabled={count <= skip + limit}
            onItemsPerPageChange={onItemsPerPageChange}
            onNext={onNext}
            onPrev={onPrev}
          />
        )}
      </div>
    </div>
  );
};
