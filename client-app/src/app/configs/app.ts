export const configs = {
  WEB_URL: import.meta.env.VITE_WEB_URL,
  API_URL: import.meta.env.VITE_API_URL,
  ADMIN_WEB_URL: import.meta.env.VITE_ADMIN_WEB_URL,
  IDENTITY_WEB_URL: import.meta.env.VITE_IDENTITY_WEB_URL,
  NODE_ENV: import.meta.env.MODE,
  COOKIE_DOMAIN: import.meta.env.VITE_COOKIE_DOMAIN,
  TIME_ZONE: import.meta.env.VITE_TIME_ZONE,
  APP_ENV: import.meta.env.VITE_BUILD_MODE,
  REACT_APP_AWS_S3_ACCOUNT_SERVICE_ASSETS_URL: import.meta.env
    .VITE_AWS_S3_ACCOUNT_SERVICE_ASSETS_URL,
  APP_VERSION: import.meta.env.VITE_VERSION || '0.1.0',
  S3_ACCOUNT_SERVICE_ASSETS_URL: import.meta.env.VITE_AWS_S3_ACCOUNT_SERVICE_ASSETS_URL,
  S3_WEB_STORAGE_ASSETS_URL: import.meta.env.VITE_AWS_S3_WEB_STORAGE_ASSETS_URL,
  ASSETS_URL: import.meta.env.VITE_ASSETS_URL,
};
