import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      require('cypress-localstorage-commands/plugin')(on, config);
      return config;
    },
    baseUrl: 'http://localhost:3005',
    supportFile: false,
    viewportWidth: 1920,
    viewportHeight: 937,
    video: false,
    experimentalSessionAndOrigin: true,
  },
  env: {
    APP_ROOT_ID: 'services-app-root',
    PUBLIC_API_URL: 'https://api-staging-1.getsquire.com',
    LOGIN_URL:
      '/v1/login?include=shops.photos,shops.address,shops.logo,shops.barbers,shops.barbers.photos,barbers.shop.brand,barbers.shop.address,brand,brand.address,permissions',
    PASSWORD: 'Test123!',
    BRAND_RENTAL_FULL_PERM_USERNAME: 'test_brand_rental_all_perm_user',
    BRAND_RENTAL_VIEW_PERM_USERNAME: 'test_brand_rental_view_perm_user',
    BRAND_RENTAL_NO_PERM_USERNAME: 'test_brand_rental_no_perm_user',
    BRAND_COMMISSION_FULL_PERM_USERNAME: 'test_brand_comission_all_perm_user',
    BRAND_COMMISSION_VIEW_PERM_USERNAME: 'test_brand_comission_view_perm_user',
    BRAND_COMMISSION_NO_PERM_USERNAME: 'test_brand_comission_no_perm_user',
    SHOP_COMMISSION_FULL_PERM_USERNAME: 'test_shop_comission_all_perm_user',
    SHOP_COMMISSION_VIEW_PERM_USERNAME: 'test_shop_comission_view_perm_user',
    SHOP_COMMISSION_NO_PERM_USERNAME: 'test_shop_comission_no_perm_user',
    SHOP_RENTAL_FULL_PERM_USERNAME: 'test_shop_rental_all_perm_user',
    SHOP_RENTAL_VIEW_PERM_USERNAME: 'test_shop_rental_view_perm_user',
    SHOP_RENTAL_NO_PERM_USERNAME: 'test_shop_rental_no_perm_user',
    BARBER_RENTAL_FULL_PERM_USERNAME: 'test_barber_rental_all_perm_user',
    BARBER_RENTAL_VIEW_PERM_USERNAME: 'test_barber_rental_view_perm_user',
    BARBER_RENTAL_NO_PERM_USERNAME: 'test_barber_rental_no_perm_user',
    BARBER_COMMISSION_FULL_PERM_USERNAME: 'test_barber_comission_all_perm_user',
    BARBER_COMMISSION_VIEW_PERM_USERNAME: 'test_barber_comission_view_perm_user',
    BARBER_COMMISSION_NO_PERM_USERNAME: 'test_barber_comission_no_perm_user',
    BARBER_INDY_FULL_PERM_USERNAME: 'test_barber_indy_all_perm_user',
    BARBER_INDY_VIEW_PERM_USERNAME: 'test_barber_indy_view_perm_user',
    BARBER_INDY_NO_PERM_USERNAME: 'test_barber_indy_none_perm_user',
    BARBER_SERVICES_URL: '/barber/services',
    BRAND_SERVICES_URL: '/brand/services',
    SHOP_SERVICES_URL: '/services',
  },
});
