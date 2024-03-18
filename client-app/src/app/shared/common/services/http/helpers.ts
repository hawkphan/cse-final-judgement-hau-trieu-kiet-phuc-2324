/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-async-promise-executor */
/* eslint-disable @typescript-eslint/ban-types */
import { ApisauceInstance } from "apisauce";
// import { Auth } from 'aws-amplify';
import { ErrorService, Toastify, TokenService } from "..";

type ApiCall = (..._args: any[]) => Promise<any>;

export async function responseWrapper<T>(
  func: ApiCall,
  [...args]: any[] = []
): Promise<T> {
  return new Promise(async (res, rej) => {
    try {
      const response = (await func(...args)) || {};
      if (response.status == 200) res(response.data);
      if (response?.originalError?.message === "CONNECTION_TIMEOUT") {
        Toastify.error(
          "Connection timeout. Please check your network and try again."
        );
      }
      rej(response.data);
    } catch (err) {
      rej(err);
    }
  });
}

export async function authResponseWrapper<T>(
  func: ApiCall,
  [...args]: any[] = []
): Promise<T> {
  return new Promise(async (res, rej) => {
    try {
      const response = (await func(...args)) || {};
      res(response);
    } catch (err) {
      rej(err);
    }
  });
}

export const getResponseData = (data: { data: any }) => data.data;

export interface ApiResponseType<T> {
  data: T;
  code?: number;
  success?: boolean;
  timestamp?: string;
}

export interface PaginationResponseType<T> {
  data: T[];
  payloadSize?: number;
  hasNext?: boolean;
  skippedRecords?: number;
  totalRecords?: number;
  skip?: number;
  take?: number;
}

export interface PaginationResponseNetType<T> {
  forEach(arg0: (item: any) => void): unknown;
  data: T[];
  pageSize?: number;
  pageNo?: number;
  hasNext?: boolean;
  skippedRecords?: number;
  totalCount?: number;
  succeeded?: boolean;
  skip?: number;
  take?: number;
}

export interface ApiPaginationResponseType<T> {
  data: PaginationResponseType<T>;
  code?: number;
  success?: boolean;
  timestamp?: string;
  query?: Object;
}

export interface ApiPaginationResponseNetType<T> {
  data: PaginationResponseNetType<T>;
  code?: number;
  success?: boolean;
  timestamp?: string;
  query?: Object;
}

export const configApiInstance = (api: ApisauceInstance) => {
  api.axiosInstance.interceptors.request.use((config) =>
    TokenService.getToken()
      .then((token: any) => {
        config.headers.Authorization = `Bearer ${token}`;
        return Promise.resolve(config);
      })
      .catch(() => Promise.resolve(config))
  );

  api.axiosInstance.interceptors.response.use(undefined, (error) => {
    if (error.response.status === 401) {
      ErrorService.interceptorsErrorHandler(error.response.data);
      // setTimeout(() => Auth.signOut(), 800);
    }
    return Promise.reject(error);
  });
};
