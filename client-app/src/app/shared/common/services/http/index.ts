
import axios from 'axios';
import { AxiosClient } from './axiosClient';
import configs from '../../../../configs';

axios.defaults.withCredentials = true;

export const httpService = new AxiosClient({
  baseURL: configs.API_URL,

  headers: {
    // 'Cache-Control': 'no-cache',
    // Pragma: 'no-cache',
    // Expires: 0,
    Accept: 'application/json',
  },
  timeout: configs.CONNECTION_TIMEOUT,
});

export {
  authResponseWrapper,
  configApiInstance,
  getResponseData,
  responseWrapper,
} from './helpers';

export type {
  ApiPaginationResponseNetType,
  ApiPaginationResponseType,
  ApiResponseType,
  PaginationResponseNetType,
  PaginationResponseType,
} from './helpers';
