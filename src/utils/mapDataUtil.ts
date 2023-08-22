import { isNil, isEmpty, omitBy } from 'lodash';

import { Service, SingleService, SingleServiceDTO } from '@app/interfaces';
import { WithoutId } from '@app/types';
import { splitDuration } from '@app/utils';

export const mapServiceFromClientToDTO = (
  service: SingleService | WithoutId<SingleService>,
): WithoutId<SingleServiceDTO> | SingleServiceDTO => {
  const duration = service.durationHours * 60 + service.durationMinutes;
  const localizedDesc = omitBy(service.localizedDesc, isNil);
  const localizedName = omitBy(service.localizedName, isNil);

  const mapped = {
    cost: service.cost,
    createdAt: service.createdAt,
    createdBy: service.createdBy,
    createdById: service.createdById,
    desc: service.desc,
    duration,
    enabled: service.enabled,
    kioskEnabled: service.kioskEnabled,
    name: service.name,
    requiresPrepaid: service.requiresPrepaid,
    serviceCategoriesId: service.serviceCategoriesId ? [service.serviceCategoriesId] : [],
    tax: service.tax?.map((tax) => ({ id: tax })) ?? [],
    localizedDesc: isEmpty(localizedDesc) ? null : localizedDesc,
    localizedName: isEmpty(localizedName) ? null : localizedName,
  };

  if ('id' in service) {
    return {
      id: service.id,
      ...mapped,
    };
  }

  return mapped;
};

export const mapServiceFromDTOtoClient = (service: Service): SingleService => {
  const { durationHours, durationMinutes } = splitDuration(service.duration);

  return {
    cost: service.cost,
    createdAt: service.createdAt,
    createdBy: service.createdBy,
    createdById: service.createdById,
    desc: service.desc,
    durationHours,
    durationMinutes,
    enabled: service.enabled,
    id: service.id,
    kioskEnabled: service.kioskEnabled,
    localizedDesc: service.localizedDesc,
    localizedName: service.localizedName,
    name: service.name,
    requiresPrepaid: service.requiresPrepaid,
    serviceCategoriesId: service.categories?.[0]?.id ?? null,
    tax: service.taxes.map((serviceTax) => serviceTax.id),
  };
};
