import { VFC } from 'react';
import classNames from 'classnames';
import { useSortable } from '@dnd-kit/sortable';
import { Money } from '@getsquire/glue-ui';
import { CurrencyCode } from '@getsquire/sage/settings';

import { DragDrop } from '@app/assets/icons';
import type { Service } from '@app/interfaces';
import { useCommanderNavigation, useServiceApp, useTranslator } from '@app/hooks';

import { TaxesCell } from './TaxesCell';
import { CategoriesCell } from './CategoriesCell';

interface ServiceListItemProps {
  currency?: CurrencyCode;
  service: Service;
}

export const ServiceListItem: VFC<ServiceListItemProps> = (props) => {
  const { currency = 'usd', service } = props;
  const { features } = useServiceApp();
  const handleNavigateClick = useCommanderNavigation();
  const {
    attributes,
    listeners,
    setDraggableNodeRef,
    setDroppableNodeRef,
    transform,
    transition,
  } = useSortable({
    id: service.id,
    transition: {
      duration: 150,
      easing: 'linear',
    },
  });

  const t = useTranslator();

  const { canOpenServices, canSortServices } = features;
  const { name, duration, cost, enabled } = service;

  const style = {
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : '',
    transition,
  };

  const linkClass = classNames('c-table-card__row is-sortable', {
    'no-pointer-events': !canOpenServices,
  });

  return (
    <div
      className={linkClass}
      data-automation-id="service-list-item"
      style={style}
      ref={setDroppableNodeRef}
      role="button"
      onClick={() => handleNavigateClick(`/${service.id}`)}
    >
      {canSortServices && (
        <div
          className="c-table-card__cell u-1/10 u-1/16-large-and-up"
          ref={setDraggableNodeRef}
          {...attributes}
          {...listeners}
        >
          <div className="c-link-blank u-text-right u-pr- u-align-middle sortable-handle">
            <DragDrop className="o-icon o-icon--medium" />
          </div>
        </div>
      )}
      <div
        className={`c-table-card__cell ${
          canSortServices ? 'u-2/10 u-3/16-large-and-up' : 'u-3/10 u-4/16-large-and-up'
        }`}
      >
        {name}
      </div>
      <div className="c-table-card__cell u-1/10 u-2/16-large-and-up">{duration} min</div>
      <div
        className="c-table-card__cell u-1/10 u-2/16-large-and-up"
        data-automation-id="money-cell"
      >
        <Money currency={currency} cents={cost} />
      </div>
      <div className="c-table-card__cell u-2/10 u-3/16-large-and-up">
        <TaxesCell taxes={service.taxes} />
      </div>
      <div className="c-table-card__cell u-2/10 u-3/16-large-and-up">
        <CategoriesCell categories={service.categories} />
      </div>
      <div className="c-table-card__cell u-1/10 u-2/16-large-and-up">
        {enabled
          ? t('pages.services.list.status.enabled')
          : t('pages.services.list.status.disabled')}
      </div>
    </div>
  );
};
