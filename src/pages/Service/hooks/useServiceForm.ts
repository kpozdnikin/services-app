import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

import { SingleService } from '@app/interfaces';
import { WithoutId } from '@app/types';
import { useYup } from '@app/hooks';

const serviceObject = (yupFn: typeof yup) =>
  yupFn.array().of(yupFn.object()).optional().min(0);
const serviceCost = (yupFn: typeof yup) => yupFn.number().required().min(0);
const serviceDescription = (yupFn: typeof yup) =>
  yupFn.string().optional().nullable().max(300);
const serviceDuration = (yupFn: typeof yup) => yupFn.number().min(0);
const serviceBool = (yupFn: typeof yup) => yupFn.bool();
const serviceName = (yupFn: typeof yup) => yupFn.string().required().min(3);
const serviceTaxes = (yupFn: typeof yup) => yupFn.array().of(yup.string());
const localizedValue = (yupFn: typeof yup) =>
  yupFn.object().optional().nullable().shape({ fr: yup.string().optional().nullable() });

export const useServiceForm = (service?: SingleService | WithoutId<SingleService>) => {
  const yup = useYup();
  const schema = yup
    .object()
    .shape({
      barbers: serviceObject(yup),
      cost: serviceCost(yup),
      desc: serviceDescription(yup),
      durationHours: serviceDuration(yup),
      durationMinutes: serviceDuration(yup),
      enabled: serviceBool(yup),
      kioskEnabled: serviceBool(yup),
      name: serviceName(yup),
      requiresPrepaid: serviceBool(yup),
      shops: serviceObject(yup),
      taxes: serviceTaxes(yup),
      localizedName: localizedValue(yup),
      localizedDesc: localizedValue(yup),
    })
    .required();

  return useForm<WithoutId<SingleService>>({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: {
      cost: service?.cost,
      desc: service?.desc,
      durationHours: service?.durationHours,
      durationMinutes: service?.durationMinutes,
      enabled: service?.enabled,
      kioskEnabled: service?.kioskEnabled,
      localizedDesc: service?.localizedDesc,
      localizedName: service?.localizedName,
      name: service?.name,
      requiresPrepaid: service?.requiresPrepaid,
      serviceCategoriesId: service?.serviceCategoriesId,
      tax: service?.tax,
    },
  });
};
