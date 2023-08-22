import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';

import { AssignmentResizableTableItem } from './types';

export const useAssignmentsTableAccordion = (
  assignmentsData: AssignmentResizableTableItem[],
) => {
  const [expandedShops, setExpandedShops] = useState<string[]>([]);
  const expandedShopsInitial = useRef<string>();

  const onParentRowClick = (row: AssignmentResizableTableItem) => {
    if (!row.shopId) {
      return;
    }

    if (!expandedShops.includes(row.shopId)) {
      setExpandedShops([...expandedShops, row.shopId]);
    } else {
      setExpandedShops(expandedShops.filter((id) => row.shopId !== id));
    }
  };

  const parentRowClassName = (row: AssignmentResizableTableItem) =>
    classNames({
      'c-shop-row': true,
      'c-shop-row--expanded': row.shopId && expandedShops.includes(row.shopId),
      'c-shop-row--empty': row.assignments?.length === 0,
    });

  const childRowClassName = (row: AssignmentResizableTableItem) =>
    classNames({
      'c-barber-row c-no-margin': true,
      'is-hidden': !expandedShops.includes(row.shopId!),
    });

  // expand first shop onload
  useEffect(() => {
    if (expandedShopsInitial.current) {
      return;
    }

    const firstShopRow = assignmentsData?.[0];

    if (firstShopRow?.shopId) {
      expandedShopsInitial.current = firstShopRow.shopId;

      setExpandedShops([firstShopRow.shopId]);
    }
  }, [assignmentsData, setExpandedShops]);

  return {
    childRowClassName,
    expandedShops,
    expandedShopsInitial,
    onParentRowClick,
    parentRowClassName,
    setExpandedShops,
  };
};
