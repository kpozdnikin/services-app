import { VFC } from 'react';
import { useParams } from 'react-router-dom';
import { LoadingOverlay } from '@getsquire/glue-ui';

import { useTranslator } from '@app/hooks';
import { CommanderContainerProps } from '@app/interfaces';

import { useCategoryQuery } from './hooks';
import { CategoryForm } from './components';

export const EditCategoryPage: VFC<CommanderContainerProps> = () => {
  const { categoryId } = useParams();
  const categoryQuery = useCategoryQuery(categoryId);
  const category = categoryQuery.data;
  const t = useTranslator();

  if (categoryQuery.status === 'loading') {
    return <LoadingOverlay status="loading" />;
  }

  return (
    <div className="u-width-100" data-automation-id="edit-category-page">
      <div className="u-max-width-710 u-margin-auto">
        <div className="c-inner-wrapper u-pt">
          <h2 className="c-heading c-heading--lightgrey u-mb">
            {t('pages.categories.edit.title')}
          </h2>
          {category && <CategoryForm category={category} />}
        </div>
      </div>
    </div>
  );
};
