import { useEffect, VFC } from 'react';
import { generatePath, Link, useParams } from 'react-router-dom';
import { LoadingOverlay } from '@getsquire/glue-ui';

import { Confirm, SimpleHeader } from '@app/components';
import { CommanderContainerProps } from '@app/interfaces';
import { mapServiceFromDTOtoClient, sendLoadingEventToCommander } from '@app/utils';
import { useServiceQuery, useCommanderNavigation, useTranslator } from '@app/hooks';
import { appRoutes, showLocalHeader } from '@app/config';

import { useServiceDeleteMutation } from './hooks';
import { Assignments } from './components';

export const EditAssignmentPage: VFC<CommanderContainerProps> = ({
  isContainerAppActive,
  toggleSidebar,
}) => {
  const { serviceId } = useParams();
  const { data: serviceData, isFetching: isServiceFetching, status } = useServiceQuery(
    serviceId,
  );
  const serviceDeleteMutation = useServiceDeleteMutation();
  const handleNavigate = useCommanderNavigation();
  const t = useTranslator();

  const service = serviceData ? mapServiceFromDTOtoClient(serviceData) : undefined;

  const onDeleteService = async () => {
    if (!serviceId) {
      throw new Error('Service id not exists');
    }

    const confirmed = await Confirm(
      t('pages.service.deleteConfirm.message'),
      t('pages.service.deleteConfirm.title'),
      [
        {
          variant: 'secondary',
          text: t('pages.service.deleteConfirm.buttons.cancel'),
          type: 'cancel',
        },
        {
          variant: 'danger',
          text: t('pages.service.deleteConfirm.buttons.delete'),
          type: 'ok',
        },
      ],
    );

    if (confirmed) {
      await serviceDeleteMutation.mutate(serviceId);

      handleNavigate(`/`);
    }
  };

  const loading = isServiceFetching || serviceDeleteMutation.isLoading;

  useEffect(() => {
    sendLoadingEventToCommander(loading);
  }, [loading]);

  return (
    <div className="s-v2" data-automation-id="edit-service-assignments-page">
      {showLocalHeader && (
        <SimpleHeader
          heading="Edit service"
          isContainerAppActive={isContainerAppActive}
          toggleSidebar={toggleSidebar}
        >
          <div className="u-height-full o-flexbox o-flexbox--content-align-center u-pr">
            {serviceId && (
              <button
                disabled={loading}
                type="button"
                className="c-btn c-btn--medium c-btn--red u-width-120 u-mr- u-float-left"
                onClick={onDeleteService}
              >
                <span className="c-btn__text">
                  {t('pages.service.assignments.buttons.delete')}
                </span>
              </button>
            )}
            <Link to={`/${serviceId}`} className="c-btn c-btn--medium u-width-120 u-mr-">
              <span className="c-btn__text">
                {t('pages.service.assignments.buttons.back')}
              </span>
            </Link>
            <Link
              to={generatePath(appRoutes.editService, { serviceId })}
              className="c-btn c-btn--grey u-width-120 u-mr-- c-btn--medium u-mr0"
            >
              <span className="c-btn__text">
                {t('pages.service.assignments.buttons.save')}
              </span>
            </Link>
          </div>
        </SimpleHeader>
      )}
      {service && (
        <Assignments
          handleDeleteService={serviceDeleteMutation.mutate}
          service={service}
        />
      )}
      <LoadingOverlay status={status} />
    </div>
  );
};
