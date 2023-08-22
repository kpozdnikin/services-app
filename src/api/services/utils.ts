export const extendSort = ({
  fields,
  order,
}: {
  fields?: string[];
  order?: 'asc' | 'desc';
}): string => {
  if (!fields) {
    return '';
  }

  return `sortBy=${fields.join(',')}:${order}`;
};

export const defaultLimitSkipSuffix = (limit: number, skip: number): string =>
  `limit=${limit}&skip=${skip}`;

export const extendInclude = (fields?: string[]): string => {
  if (!fields) {
    return '';
  }

  return `include=${fields.join(',')}`;
};

export const defaultServicesQuerySuffix = `${extendInclude([
  'shops',
  'category',
])}&${extendSort({
  fields: ['order', 'createdAt'],
  order: 'asc',
})}&${defaultLimitSkipSuffix(500, 0)}`;

export const defaultShopsQuerySuffix = `${extendInclude(['barbers', 'barbers.photos'])}`;

export const defaultBarbersQuerySuffix = `${extendInclude([
  'shop',
  'schedules',
  'services',
  'photos',
  'days_on',
  'commissionTiers',
  'productCommissionTiers',
])}&${defaultLimitSkipSuffix(200, 0)}&sortBy=order:asc,createdAt:desc`;

export const defaultServicesExportSuffix = `${extendInclude([
  'shops',
  'category',
])}&${extendSort({ fields: ['order', 'createdAt'], order: 'asc' })}&view=csv`;
