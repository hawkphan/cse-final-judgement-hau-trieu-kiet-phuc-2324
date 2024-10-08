/* eslint-disable no-async-promise-executor */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Toastify } from "../../shared";

type ApiCall = (..._args: any[]) => Promise<any>;

export async function responseWrapper<T>(func: ApiCall, [...args]: any[] = []): Promise<T> {
    return new Promise(async (res, rej) => {
      try {
        const response = (await func(...args)) || {};
        if (response.ok || response.status === 200) res(response.data);
        if (response?.originalError?.message === 'CONNECTION_TIMEOUT') {
          Toastify.error('Connection timeout. Please check your network and try again.');
        }
        rej(response.data);
      } catch (err) {
        rej(err);
      }
    });
  }