import { VFC } from 'react';
import sortBy from 'lodash/sortBy';
import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  MouseSensor,
  useSensors,
  useSensor,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { restrictToVerticalAxis, restrictToWindowEdges } from '@dnd-kit/modifiers';

import { Service } from '@app/interfaces';
import { useServiceApp, useTranslator } from '@app/hooks';

import { useServicesListUpdate } from '../../hooks';
import { ServiceListItem } from './ServiceListItem';

interface ServiceListProps {
  services: Service[];
}

export const ServicesList: VFC<ServiceListProps> = (props) => {
  const { services } = props;
  const { currency, features } = useServiceApp();
  const { handleUpdateOrder } = useServicesListUpdate();
  const t = useTranslator();

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const items = services.map((service) => service.id) as string[];
  const { canSortServices } = features;

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!active || !over) {
      return;
    }

    if (active.id !== over.id) {
      const overServiceIndex = services.findIndex((service) => service.id === over.id);

      const reorderedServices = services.map((service, index) => {
        if (service.id === active.id) {
          return {
            ...service,
            id: service.id,
            order: overServiceIndex + 1,
          };
        }

        return {
          ...service,
          order: index,
        };
      });

      const sorted = sortBy(reorderedServices, [(service) => service.order]);

      void handleUpdateOrder(sorted);
    }
  };

  if (!features?.canViewServices) {
    return null;
  }

  return (
    <div
      data-automation-id="services-list"
      className="c-table-with-sticky-header u-position-relative"
    >
      <div className="u-scrollable-visible">
        <div className="c-table-card c-table-new c-sticky-header u-no-shadow c-table-card--fixed">
          <div data-automation-id="services-table-header" className="c-table-card__head">
            {canSortServices && (
              <div className="c-table-card__cell c-label u-1/10 u-1/16-large-and-up">
                {t('pages.services.list.columns.sort')}
              </div>
            )}
            <div
              className={`c-table-card__cell c-label ${
                canSortServices
                  ? 'u-2/10 u-3/16-large-and-up'
                  : 'u-3/10 u-4/16-large-and-up'
              }`}
            >
              {t('pages.services.list.columns.name')}
            </div>
            <div className="c-table-card__cell c-label u-1/10 u-2/16-large-and-up">
              {t('pages.services.list.columns.duration')}
            </div>
            <div className="c-table-card__cell c-label u-1/10 u-2/16-large-and-up">
              {t('pages.services.list.columns.price')}
            </div>
            <div className="c-table-card__cell c-label u-2/10 u-3/16-large-and-up">
              {t('pages.services.list.columns.tax')}
            </div>
            <div className="c-table-card__cell c-label u-2/10 u-3/16-large-and-up">
              {t('pages.services.list.columns.category')}
            </div>
            <div className="c-table-card__cell c-label u-1/10 u-2/16-large-and-up">
              {t('pages.services.list.columns.status')}
            </div>
          </div>
        </div>
        <div
          className="c-table-card c-table-new c-table-card--fixed"
          data-automation-id="services-table-body"
        >
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            modifiers={[restrictToVerticalAxis, restrictToWindowEdges]}
            onDragEnd={handleDragEnd}
          >
            <SortableContext items={items} strategy={verticalListSortingStrategy}>
              {services.map((service: Service) => (
                <ServiceListItem currency={currency} service={service} key={service.id} />
              ))}
            </SortableContext>
          </DndContext>
        </div>
      </div>
    </div>
  );
};
