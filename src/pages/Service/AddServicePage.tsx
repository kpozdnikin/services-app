import { useEffect, VFC } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { LoadingOverlay } from '@getsquire/glue-ui';

import { SimpleHeader } from '@app/components';
import { WithoutId } from '@app/types';
import { CommanderContainerProps, Service, SingleService } from '@app/interfaces';
import {
  useCommanderNavigation,
  useServiceApp,
  useTaxesQuery,
  useTranslator,
} from '@app/hooks';
import { showLocalHeader } from '@app/config';
import { sendLoadingEventToCommander } from '@app/utils';

import { useServiceAddMutation } from './hooks';
import { ServiceForm } from './components';

const service: WithoutId<SingleService> = {
  createdAt: null,
  createdBy: null,
  createdById: null,
  cost: 0,
  desc: '',
  durationHours: 0,
  durationMinutes: 0,
  enabled: true,
  kioskEnabled: true,
  name: '',
  requiresPrepaid: false,
  serviceCategoriesId: null,
  tax: [],
};

export const AddServicePage: VFC<CommanderContainerProps> = ({
  isContainerAppActive,
  toggleSidebar,
}) => {
  const {
    features: { canModifyServices, canAssignService },
  } = useServiceApp();
  const {
    data: taxesData,
    isFetching: isTaxFetching,
    status: taxesRequestStatus,
  } = useTaxesQuery();
  const taxes = taxesData?.rows?.filter((tax) => tax.enabled) ?? [];
  const serviceAddMutation = useServiceAddMutation();
  const handleNavigate = useCommanderNavigation();
  const t = useTranslator();

  const performSubmit = async (submittedService: SingleService) => {
    const result: Service = await serviceAddMutation.mutate({
      ...service,
      ...submittedService,
    });

    const navigateTo = canAssignService ? `/${result?.id}/assign` : '/';

    handleNavigate(navigateTo);
  };

  const loading = isTaxFetching || serviceAddMutation.isLoading;

  useEffect(() => {
    sendLoadingEventToCommander(loading);
  }, [loading]);

  return (
    <div className="s-v2" data-automation-id="add-service-page">
      {showLocalHeader && (
        <SimpleHeader
          heading={t('pages.service.add.title')}
          isContainerAppActive={isContainerAppActive}
          toggleSidebar={toggleSidebar}
        >
          <div className="u-height-full o-flexbox o-flexbox--content-align-center u-pr">
            <Link
              to="/"
              className={classNames(
                'c-btn--medium c-btn c-btn--grey u-width-120',
                'u-mr--',
              )}
            >
              <span className="c-btn__text">{t('pages.service.add.buttons.cancel')}</span>
            </Link>
            <button
              disabled={loading}
              type="submit"
              className="c-btn c-btn--medium u-width-120"
              form="serviceDetails"
            >
              <span className="c-btn__text">
                {canAssignService
                  ? t('pages.service.add.buttons.next')
                  : t('pages.service.add.buttons.save')}
              </span>
            </button>
          </div>
        </SimpleHeader>
      )}
      <ServiceForm
        canEditCategory={canModifyServices}
        canEditServiceNameOrDescription={canModifyServices}
        performSubmit={performSubmit}
        service={service}
        taxes={taxes}
      />
      <LoadingOverlay status={taxesRequestStatus} />
    </div>
  );
};
