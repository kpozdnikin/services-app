import { BrandServiceAssignMutation } from './BrandServiceAssignMutation';
import { BrandServiceAssignmentSaveMutation } from './BrandServiceAssignmentSaveMutation';
import { BrandServiceUnAssignMutation } from './BrandServiceUnAssignMutation';

export class BrandServiceAssignmentApiService {
  static brandServiceAssign = new BrandServiceAssignMutation();
  static brandServiceAssignmentSave = new BrandServiceAssignmentSaveMutation();
  static brandServiceUnAssign = new BrandServiceUnAssignMutation();
}
