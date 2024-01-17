import { configs } from './app';

export const AWS_CONFIG = {
  region: import.meta.env.VITE_AWS_IDENTITY_REGION,
  userPoolId: import.meta.env.VITE_AWS_USER_POOL_ID,
  userPoolWebClientId: import.meta.env.VITE_AWS_USER_POOL_WEB_CLIENT_ID,
  authenticationFlowType: 'CUSTOM_AUTH', // 'USER_PASSWORD_AUTH','CUSTOM_AUTH'
  oauth: {
    domain: import.meta.env.VITE_AWS_USER_POOL_DOMAIN,
    scope: ['phone', 'email', 'profile', 'openid', 'aws.cognito.signin.user.admin'],
    redirectSignIn: `${import.meta.env.VITE_WEB_URL}/login`,
    redirectSignOut: `${import.meta.env.VITE_WEB_URL}/login`,
    responseType: 'code',
  },
  cookieStorage: {
    domain: configs.COOKIE_DOMAIN,
    secure: false,
    path: '/',
    expires: 365,
  },
};

export const CUSTOM_AWS_CONFIG = {
  ...AWS_CONFIG,
  authenticationFlowType: 'CUSTOM_AUTH',
};
