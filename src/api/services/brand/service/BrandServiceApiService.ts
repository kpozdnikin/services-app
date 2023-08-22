import { BrandServicesQuery } from './BrandServicesQuery';
import { BrandServicesExport } from './BrandServicesExport';
import { BrandServicesOrderMutation } from './BrandServicesOrderMutation';
import { BrandServiceQuery } from './BrandServiceQuery';
import { BrandServiceAddMutation } from './BrandServiceAddMutation';
import { BrandServiceDeleteMutation } from './BrandServiceDeleteMutation';
import { BrandServiceUpdateMutation } from './BrandServiceUpdateMutation';

export class BrandServiceApiService {
  static brandServicesQuery = new BrandServicesQuery();
  static brandServicesExport = new BrandServicesExport();
  static updateBrandServicesOrder = new BrandServicesOrderMutation();
  static brandServiceQuery = new BrandServiceQuery();
  static brandServiceAdd = new BrandServiceAddMutation();
  static brandServiceDelete = new BrandServiceDeleteMutation();
  static brandServiceUpdate = new BrandServiceUpdateMutation();
}
