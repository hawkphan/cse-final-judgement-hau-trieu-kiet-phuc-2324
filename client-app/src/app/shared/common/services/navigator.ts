
import { NavigateFunction, NavigateOptions } from 'react-router-dom';
import configs from '../../../configs';

const goBack = (navigate: NavigateFunction, defaultUrl = '/') => {
  if (window.history.state && window.history.state.idx > 0) {
    navigate(-1);
  } else {
    navigate(defaultUrl, { replace: true });
  }
};

const navigateCrossSubdomain = (
  navigate: NavigateFunction,
  subdomain: string,
  routeName: string,
  params: NavigateOptions,
) => {
  if (getSubdomain() === subdomain) {
    navigate(`/${routeName}`, params);
  } else {
    let url = `${configs.WEB_URL}/${routeName}`;
    url = subdomain ? url.replace('://', `://${subdomain}.`) : url;
    window.location.href = url;
  }
};

const getSubdomain = () => window.location.hostname.split('.')[0];

export const getNavigateUrl = (url: string) => (url.includes('http') ? url : `https://${url}`);

export const getNavigateIdentityUrl = (url: string) =>
  url.includes('http') ? url : `https://identity.${url}`;

const jumpToWebIdentity = (nextPath = '') =>
  window.open(`${getNavigateUrl(configs.IDENTITY_WEB_URL)}${nextPath}`, '_self');

const jumpToWebAdmin = (nextPath = '') =>
  window.open(`${getNavigateUrl(configs.ADMIN_WEB_URL)}${nextPath}`, '_self');

export default {
  goBack,
  navigateCrossSubdomain,
  getSubdomain,
  jumpToWebIdentity,
  jumpToWebAdmin,
  getNavigateIdentityUrl,
};
