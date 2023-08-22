import { ShopServiceAssignmentSaveMutation } from './ShopServiceAssignmentSaveMutation';
import { ShopServiceAssignmentUpdateMutation } from './ShopServiceAssignmentUpdateMutation';
import { ShopServiceAssignMutation } from './ShopServiceAssignMutation';

export class ShopServiceAssignmentApiService {
  static shopServiceAssign = new ShopServiceAssignMutation();
  static shopServiceAssignmentSave = new ShopServiceAssignmentSaveMutation();
  static shopServiceAssignmentUpdate = new ShopServiceAssignmentUpdateMutation();
}
