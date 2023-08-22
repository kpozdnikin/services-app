import { ServiceBase } from '@app/interfaces';

interface TaxDTO {
  id: string;
}

// FIXME: Think on better naming
export interface SingleServiceDTO extends ServiceBase {
  duration: number;
  serviceCategoriesId: string[];
  tax?: TaxDTO[];
}
