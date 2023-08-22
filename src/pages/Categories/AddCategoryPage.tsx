import { VFC } from 'react';

import { useTranslator } from '@app/hooks';
import { CommanderContainerProps } from '@app/interfaces';

import { CategoryForm } from './components';

export const AddCategoryPage: VFC<CommanderContainerProps> = () => {
  const t = useTranslator();
  const category = {
    name: '',
  };

  return (
    <div className="u-width-100" data-automation-id="add-category-page">
      <div className="u-max-width-710 u-margin-auto">
        <div className="c-inner-wrapper u-pt">
          <h2 className="c-heading c-heading--lightgrey u-mb">
            {t('pages.categories.add.title')}
          </h2>
          <CategoryForm category={category} />
        </div>
      </div>
    </div>
  );
};
