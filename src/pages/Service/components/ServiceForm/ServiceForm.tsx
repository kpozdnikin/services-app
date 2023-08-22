import { useRef, useState, VFC } from 'react';
import { range, without } from 'lodash';
import styled from 'styled-components';

import { Option, TaxBase, WithoutId } from '@app/types';
import { LanguageCode, USER_KIND_BARBER, USER_KIND_BRAND } from '@app/constants';
import {
  CheckboxSwitch,
  CurrencyInputField,
  LockableInput,
  LockableSelect,
  LockableTextArea,
  SelectInput,
  SelectMultipleField,
  Tooltip,
} from '@app/components';
import { config } from '@app/config';
import { SingleService } from '@app/interfaces';
import {
  useCategoriesListQuery,
  useEventHandler,
  useServiceApp,
  useTranslator,
} from '@app/hooks';
import { DEFAULT_MIN_INTERVAL, getMinuteOptionsForMinInterval } from '@app/utils';

import { useServiceForm } from '../../hooks';
import { LocalizationTabs } from '../LocalizationTabs';

const getSelectedLanguagesFromService = (service: ServiceFormProps['service']) => {
  const selected: LanguageCode[] = [];

  if (service.name !== null) {
    selected.push(LanguageCode.en);
  }

  if (
    service.localizedDesc &&
    'fr' in service.localizedDesc &&
    service.localizedDesc?.['fr'] !== null
  ) {
    selected.push(LanguageCode.fr);
  }

  return selected;
};

export interface ServiceFormProps {
  deleteService?: (serviceId: string) => Promise<void>;
  canEditServiceNameOrDescription?: boolean;
  canEditCategory?: boolean;
  performSubmit: (submittedService: SingleService) => Promise<void>;
  service: SingleService | WithoutId<SingleService>;
  taxes: TaxBase[];
}

export const ServiceForm: VFC<ServiceFormProps> = ({
  deleteService,
  canEditServiceNameOrDescription,
  canEditCategory,
  performSubmit,
  service,
  taxes,
}) => {
  const { shop, userKind, brand } = useServiceApp();
  const formRef = useRef<HTMLFormElement>(null);
  const t = useTranslator();

  const categoriesQuery = useCategoriesListQuery(
    config.defaultServiceCategoriesLimit,
    config.defaultServiceCategoriesSkip,
  );

  const form = useServiceForm(service);

  const { formState, getValues, handleSubmit, setValue, register } = form;

  // TODO - use callBack only
  const onFormSubmit = () => handleSubmit(performSubmit)();

  useEventHandler(onFormSubmit, deleteService);

  const { errors, dirtyFields } = formState;

  const categories = categoriesQuery.data?.rows ?? [];

  const { minuteOptions } = getMinuteOptionsForMinInterval(
    shop?.minInterval ?? DEFAULT_MIN_INTERVAL,
  );

  let minutes = minuteOptions;

  if (Number(service.durationHours) < 1) {
    minutes = without(minutes, 5);
  }

  const taxSelectOptions = taxes.map(
    (tax: TaxBase): Option => ({
      label: `${tax.name} ${tax.percentage}%`,
      value: tax.id,
    }),
  );

  const categorySelectOptions: Option[] = categories.map((category) => ({
    label: category.name,
    value: category.id,
  }));

  const defaultLanguage =
    shop?.settings?.defaultLanguage ??
    brand?.settings?.defaultLanguage ??
    LanguageCode.en;
  const supportedLanguages = shop?.settings?.supportedLanguages ??
    brand?.settings?.supportedLanguages ?? [LanguageCode.en];

  const [selectedLanguages, setSelectedLanguages] = useState(
    getSelectedLanguagesFromService(service),
  );
  const [currentLanguage, setCurrentLanguage] = useState(defaultLanguage);
  const serviceNameField =
    currentLanguage === LanguageCode.en ? 'name' : 'localizedName.fr';
  const serviceDescField =
    currentLanguage === LanguageCode.en ? 'desc' : 'localizedDesc.fr';

  return (
    <Form
      id="serviceDetails"
      className="u-max-width-710"
      data-automation-id="service-details-form"
      ref={formRef}
      onSubmit={handleSubmit(performSubmit)}
    >
      <div className="c-inner-wrapper u-pt u-br-12">
        <div className="c-inner-wrapper u-max-width-710">
          <LocalizationTabs
            selectedLanguagesCodes={selectedLanguages}
            supportedLanguagesCodes={supportedLanguages}
            currentLanguageCode={currentLanguage}
            defaultLanguageCode={defaultLanguage}
            onAddLanguage={(language) =>
              setSelectedLanguages([...selectedLanguages, language])
            }
            onRemoveLanguage={(language) => {
              setSelectedLanguages(selectedLanguages.filter((lang) => lang !== language));
              if (language === LanguageCode.en) {
                setValue('name', null);
                setValue('desc', null);
              }

              if (language === LanguageCode.fr) {
                setValue('localizedName', undefined);
                setValue('localizedDesc', undefined);
              }
            }}
            onChangeCurrentLanguage={(language) => setCurrentLanguage(language)}
          >
            <div className="c-label-new">{t('pages.service.form.name.label')}</div>
            <div className="o-flexbox u-pb-">
              <div className="o-flexbox__item u-flex-1">
                <LockableInput
                  className="c-input"
                  dirty={dirtyFields.name}
                  disabled={!canEditServiceNameOrDescription}
                  error={errors?.name?.message}
                  hint={t('pages.service.form.limitedPermissionsHint')}
                  placeholder={t('pages.service.form.name.placeholder')}
                  type="text"
                  key={serviceNameField}
                  {...register(serviceNameField)}
                />
              </div>
            </div>
            <div className="c-label-new u-mt--">
              {t('pages.service.form.description.label')}
            </div>
            <div className="o-flexbox u-pb-">
              <LockableTextArea
                disabled={!canEditServiceNameOrDescription}
                dirty={dirtyFields.desc}
                error={errors?.desc?.message}
                fieldClassName="o-flexbox__item u-flex-1 c-protected-input"
                hint={t('pages.service.form.limitedPermissionsHint')}
                placeholder={t('pages.service.form.description.placeholder')}
                textAreaClassName="c-input u-min-height-66"
                key={serviceDescField}
                {...register(serviceDescField)}
              />
            </div>
          </LocalizationTabs>
          <div className="c-label-new">{t('pages.service.form.category.label')}</div>
          <LockableSelect
            empty
            error={errors?.serviceCategoriesId?.message}
            disabled={!canEditCategory}
            dirty={dirtyFields.serviceCategoriesId}
            hint={t('pages.service.form.limitedPermissionsHint')}
            options={categorySelectOptions}
            value={getValues('serviceCategoriesId') ?? ''}
            {...register('serviceCategoriesId')}
          />
          {!!taxSelectOptions.length && (
            <div className="o-flexbox o-flexbox--justify-start o-flexbox--content-align-center u-mt-">
              <div className="c-label-new u-mv--">
                {t('pages.service.form.tax.label')}
              </div>
              <Tooltip
                className="u-m--"
                id="for-tax-type"
                place="right"
                tooltipClassName="custom-tooltip"
                wrapperClassName="info"
              >
                {t('pages.service.form.tax.tooltip')}
              </Tooltip>
            </div>
          )}
          <SelectMultipleField
            dirty={dirtyFields.tax}
            error={errors?.tax?.map(({ message }) => message)}
            name="tax"
            options={taxSelectOptions}
            setValue={setValue}
            value={getValues('tax')}
          />
          {userKind === USER_KIND_BRAND && (
            <div className="o-flexbox o-flexbox--justify-start o-flexbox--content-align-center u-mt-">
              <div className="c-heading--small c-heading--semibold">
                {t('pages.service.form.locationsDefault.label')}
              </div>
              <Tooltip
                className="u-m--"
                id="for-default"
                place="right"
                tooltipClassName="custom-tooltip"
                wrapperClassName="info"
              >
                {t('pages.service.form.locationsDefault.tooltip')}
              </Tooltip>
            </div>
          )}
          <div className="layout layout--small u-mt-">
            <div className="layout__item u-2/3-large-and-up">
              <div className="c-label-new u-mt--">
                {t('pages.service.form.serviceDuration.label')}
              </div>
              <div className="layout layout--flush">
                <div className="layout__item u-1/2">
                  <SelectInput
                    error={errors?.durationHours?.message}
                    dirty={dirtyFields.durationHours}
                    options={range(0, 13)}
                    suffix={t('pages.service.form.serviceDuration.suffixHours')}
                    {...register('durationHours')}
                  />
                </div>
                <div className="layout__item u-1/2">
                  <SelectInput
                    error={errors?.durationMinutes?.message}
                    dirty={dirtyFields.durationMinutes}
                    options={minutes}
                    suffix={t('pages.service.form.serviceDuration.suffixMinutes')}
                    {...register('durationMinutes')}
                  />
                </div>
              </div>
            </div>
            <div className="layout__item u-1/3-large-and-up">
              <div className="c-label-new u-mt--">
                {t('pages.service.form.pricing.label')}
              </div>
              <CurrencyInputField
                className="c-input"
                dirty={dirtyFields.cost}
                error={errors?.cost?.message}
                name="cost"
                placeholder="0"
                setValue={setValue}
                value={getValues('cost')}
              />
            </div>
          </div>
          <div className="o-flexbox o-flexbox--justify-start o-flexbox--content-align-center u-pv- u-mt">
            <CheckboxSwitch
              label={t('pages.service.toggles.onlineVisibility.label')}
              className="u--mr--"
              error={errors?.enabled?.message}
              dirty={dirtyFields.enabled}
              {...register('enabled')}
            />
            <Tooltip
              className="u-m--"
              id="for-enabled"
              place="right"
              tooltipClassName="custom-tooltip"
              wrapperClassName="info"
            >
              {t('pages.service.toggles.onlineVisibility.tooltip')}
            </Tooltip>
          </div>
          <div className="o-flexbox o-flexbox--justify-start o-flexbox--content-align-center">
            <CheckboxSwitch
              className="u--mr--"
              dirty={dirtyFields.requiresPrepaid}
              error={errors?.requiresPrepaid?.message}
              label={t('pages.service.toggles.requiresPrepaid.label')}
              {...register('requiresPrepaid')}
            />
            <Tooltip
              className="u-m--"
              id="for-requiresPrepaid"
              place="right"
              tooltipClassName="custom-tooltip"
              wrapperClassName="info"
            >
              {t('pages.service.toggles.requiresPrepaid.tooltip')}
            </Tooltip>
          </div>
          {userKind !== USER_KIND_BARBER && (
            <div className="o-flexbox o-flexbox--justify-start o-flexbox--content-align-center c-protected-input u-pv-">
              <CheckboxSwitch
                className="u--mr--"
                dirty={dirtyFields.kioskEnabled}
                error={errors?.kioskEnabled?.message}
                label={t('pages.service.toggles.kiosk.label')}
                {...register('kioskEnabled')}
              />
              <Tooltip
                className="u-m--"
                id="for-kioskEnabled"
                place="right"
                tooltipClassName="custom-tooltip"
                wrapperClassName="info"
              >
                {t('pages.service.toggles.kiosk.tooltip')}
              </Tooltip>
            </div>
          )}
        </div>
      </div>
    </Form>
  );
};

const Form = styled.form`
  color: #5d5858;
  font-family: 'Open Sans', sans-serif;
`;
