import { ShopServiceQuery } from './ShopServiceQuery';
import { ShopServicesQuery } from './ShopServicesQuery';
import { ShopServicesExport } from './ShopServicesExport';
import { ShopServicesOrderMutation } from './ShopServicesOrderMutation';
import { ShopServiceAddMutation } from './ShopServiceAddMutation';
import { ShopServiceDeleteMutation } from './ShopServiceDeleteMutation';
import { ShopServiceUpdateMutation } from './ShopServiceUpdateMutation';

export class ShopServiceApiService {
  static shopServiceQuery = new ShopServiceQuery();
  static shopServicesQuery = new ShopServicesQuery();
  static shopServicesExport = new ShopServicesExport();
  static updateShopServicesOrder = new ShopServicesOrderMutation();
  static shopServiceAdd = new ShopServiceAddMutation();
  static shopServiceDelete = new ShopServiceDeleteMutation();
  static shopServiceUpdate = new ShopServiceUpdateMutation();
}
