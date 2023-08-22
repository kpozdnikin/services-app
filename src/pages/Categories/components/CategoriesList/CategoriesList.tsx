import { MouseEvent, VFC, useEffect, useState } from 'react';
import { orderBy } from 'lodash';
import classNames from 'classnames';
import { generatePath } from 'react-router-dom';

import { Category } from '@app/interfaces';
import { SortIcon } from '@app/components';
import { appRoutes } from '@app/config';
import { useCommanderNavigation, useTranslator } from '@app/hooks';

interface CategoriesListProps {
  categories: Category[];
  className?: string;
}

const linkStyles = {
  alignItems: 'center',
  display: 'flex',
  width: '100%',
  height: '100%',
  textDecoration: 'none',
  padding: '1rem 0',
};

export const CategoriesList: VFC<CategoriesListProps> = ({ categories, className }) => {
  const [sort, setSort] = useState<'asc' | 'desc'>('asc');
  const [sortedData, setSortedData] = useState<Category[]>([]);
  const handleNavigateClick = useCommanderNavigation();
  const t = useTranslator();

  const onThClick = () => {
    setSort((prevSort) => (prevSort === 'asc' ? 'desc' : 'asc'));
  };

  const handleCategoryClick = (categoryId: string, e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    handleNavigateClick(generatePath(appRoutes.editCategory, { categoryId }));
  };

  useEffect(() => {
    const localCategories = orderBy(categories, ['name'], [sort]);

    setSortedData(localCategories);
  }, [categories, sort]);

  if (categories.length === 0) {
    return (
      <div className={classNames('c-heading c-heading--small u-mt', className)}>
        {t('pages.categories.list.emptyMessage')}
      </div>
    );
  }

  return (
    <table
      className={classNames('c-table-card c-table-new u-table-layout-fixed', className)}
      data-automation-id="categories-table"
    >
      <thead data-automation-id="categories-table-header">
        <tr className="reactable-column-header">
          <th
            className="reactable-th-name c-table-card__cell c-label u-text-left"
            onClick={onThClick}
          >
            {t('pages.categories.list.columns.name')}
            <SortIcon sort={sort} />
          </th>
        </tr>
      </thead>
      <tbody className="reactable-data">
        {sortedData?.map((category) => (
          <tr className="c-table-card__row" key={category.id}>
            <td className="c-table-card__cell">
              <a
                style={linkStyles}
                href={generatePath(appRoutes.editCategory, { categoryId: category.id })}
                onClick={(e) => handleCategoryClick(category.id, e)}
              >
                {category.name}
              </a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
