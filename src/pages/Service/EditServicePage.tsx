import { useEffect, VFC } from 'react';
import { Link, useParams } from 'react-router-dom';
import classNames from 'classnames';
import { LoadingOverlay } from '@getsquire/glue-ui';

import { Confirm, SimpleHeader } from '@app/components';
import { mapServiceFromDTOtoClient, sendLoadingEventToCommander } from '@app/utils';
import {
  useServiceQuery,
  useCommanderNavigation,
  useServiceApp,
  useTaxesQuery,
  useTranslator,
} from '@app/hooks';
import { showLocalHeader } from '@app/config';
import { SingleService, CommanderContainerProps } from '@app/interfaces';

import { useServiceDeleteMutation, useServiceUpdateMutation } from './hooks';
import { ServiceForm } from './components';

export const EditServicePage: VFC<CommanderContainerProps> = ({
  isContainerAppActive,
  toggleSidebar,
}) => {
  const { serviceId } = useParams();

  const { features, getEditPermissionsByService } = useServiceApp();
  const { data: serviceData, isFetching: isServiceFetching } = useServiceQuery(serviceId);
  const { data: taxesData, isFetching: isTaxFetching } = useTaxesQuery();
  const taxes = taxesData?.rows?.filter((tax) => tax.enabled) ?? [];
  const handleNavigate = useCommanderNavigation();
  const serviceUpdateMutation = useServiceUpdateMutation();
  const serviceDeleteMutation = useServiceDeleteMutation();
  const { canAssignService } = features;
  const t = useTranslator();

  const service = serviceData ? mapServiceFromDTOtoClient(serviceData) : undefined;

  const performSubmit = async (submittedService: SingleService) => {
    await serviceUpdateMutation.mutate({
      ...service,
      ...submittedService,
    });

    const navigateTo = canAssignService ? `/${serviceId}/assign` : '/';

    handleNavigate(navigateTo);
  };

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

  const {
    canEditCategory,
    canEditServiceNameOrDescription,
  } = getEditPermissionsByService(service);

  const loading =
    isServiceFetching ||
    isTaxFetching ||
    serviceUpdateMutation.isLoading ||
    serviceDeleteMutation.isLoading;

  useEffect(() => {
    sendLoadingEventToCommander(loading);
  }, [loading]);

  return (
    <div className="s-v2" data-automation-id="edit-service-page">
      {showLocalHeader && (
        <SimpleHeader
          heading={t('pages.service.edit.title')}
          isContainerAppActive={isContainerAppActive}
          toggleSidebar={toggleSidebar}
        >
          <div className="u-height-full o-flexbox o-flexbox--content-align-center u-pr">
            {serviceId && (
              <button
                data-automation-id="delete-service-button"
                disabled={loading}
                type="button"
                className="c-btn c-btn--medium c-btn--red u-width-120 u-mr- u-float-left"
                onClick={onDeleteService}
              >
                <span className="c-btn__text">
                  {t('pages.service.edit.buttons.delete')}
                </span>
              </button>
            )}
            <Link
              to="/"
              className={classNames(
                'c-btn--medium c-btn c-btn--grey u-width-120',
                'u-mr--',
              )}
            >
              <span className="c-btn__text">
                {t('pages.service.edit.buttons.cancel')}
              </span>
            </Link>
            <button
              disabled={loading}
              type="submit"
              className="c-btn c-btn--medium u-width-120"
              form="serviceDetails"
            >
              <span className="c-btn__text">
                {canAssignService
                  ? t('pages.service.edit.buttons.next')
                  : t('pages.service.edit.buttons.save')}
              </span>
            </button>
          </div>
        </SimpleHeader>
      )}
      {service && (
        <ServiceForm
          deleteService={serviceDeleteMutation.mutate}
          canEditServiceNameOrDescription={canEditServiceNameOrDescription}
          canEditCategory={canEditCategory}
          performSubmit={performSubmit}
          service={service}
          taxes={taxes}
        />
      )}
      {(isServiceFetching || isTaxFetching) && <LoadingOverlay status="loading" />}
    </div>
  );
};
