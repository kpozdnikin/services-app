import { BrandServiceCategoryAddMutation } from './BrandServiceCategoryAddMutation';
import { BrandServiceCategoriesQuery } from './BrandServiceCategoriesQuery';
import { BrandServiceCategoryQuery } from './BrandServiceCategoryQuery';
import { BrandServiceCategoryDeleteMutation } from './BrandServiceCategoryDeleteMutation';
import { BrandServiceCategoryUpdateMutation } from './BrandServiceCategoryUpdateMutation';

export class BrandServiceCategoryApiService {
  static brandServiceCategories = new BrandServiceCategoriesQuery();
  static brandServiceCategory = new BrandServiceCategoryQuery();
  static brandServiceAddCategory = new BrandServiceCategoryAddMutation();
  static brandServiceDeleteCategory = new BrandServiceCategoryDeleteMutation();
  static brandServiceUpdateCategory = new BrandServiceCategoryUpdateMutation();
}
