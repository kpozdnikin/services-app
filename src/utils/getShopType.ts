import { ShopKind, ShopType } from '@app/types';

export function getShopType(kind?: number): ShopType | null {
  switch (kind) {
    case ShopKind.RENTAL:
      return 'rental';
    case ShopKind.COMMISSION:
      return 'commission';
    default:
      return null;
  }
}
