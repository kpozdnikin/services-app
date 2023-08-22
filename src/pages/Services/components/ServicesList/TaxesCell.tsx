import { VFC } from 'react';

import type { TaxBase } from '@app/types';

interface TaxesProps {
  taxes: TaxBase[];
}

export const TaxesCell: VFC<TaxesProps> = (props) => {
  const { taxes } = props;

  if (!taxes?.length) {
    return <span>-</span>;
  }

  return (
    <>
      {taxes.map((tax, index) => (
        <span key={`${index}-${tax.percentage}`}>{`${tax.name} ${tax.percentage}%`}</span>
      ))}
    </>
  );
};
