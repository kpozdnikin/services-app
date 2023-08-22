export {};

interface Process {
  env: {
    FEDERATED: boolean;
    NODE_ENV: string;
    PUBLIC_API_URL: string;
    PUBLIC_DEPLOYMENT_ENV: 'local' | 'development' | 'staging' | 'production';
    PUBLIC_DEPLOYMENT_URL: string;
    PUBLIC_PORT?: string;
    PUBLIC_APP_ROOT_ID: string;
    PUBLIC_BARBER_TOKEN: string;
    PUBLIC_BRAND_TOKEN: string;
    PUBLIC_SHOP_TOKEN: string;
  };
}

declare global {
  declare const process: Process;
  interface Window {
    __tcs_web_services_shadow_styles?: HTMLLinkElement[];
  }
}
