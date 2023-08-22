import { VFC } from 'react';

import type { Category } from '@app/interfaces';

interface CategoriesProps {
  categories: Category[];
}

export const CategoriesCell: VFC<CategoriesProps> = (props) => {
  const { categories } = props;

  if (!categories?.length) {
    return <span>-</span>;
  }

  return (
    <>
      {categories.map((category: Category) => (
        <span key={category.id} className="u-block">
          {category.name}
        </span>
      ))}
    </>
  );
};
