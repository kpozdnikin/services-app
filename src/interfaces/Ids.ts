export interface BrandId {
  brandId: string;
}

export interface ShopId {
  shopId: string;
}

export interface BarberAndShopId extends ShopId {
  barberId: string;
}

export interface ServiceId {
  serviceId: string;
}

export interface BrandAndCategoryIds extends BrandId {
  categoryId: string;
}

export interface BarberShopAndServiceIds extends BarberAndShopId {
  serviceId: string;
}

export interface BrandAndServiceIds extends BrandId {
  serviceId: string;
}

export interface ShopAndServiceIds extends ShopId {
  serviceId: string;
}
