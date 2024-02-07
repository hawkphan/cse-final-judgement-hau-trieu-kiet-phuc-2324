/* eslint-disable @typescript-eslint/no-explicit-any */
export type TableParamsNet = {
  skip?: number;
  pageNo?: number;
  pageSize?: number;
  order?: string;
  search?: string;
  keywords?: string;
  sort?: string;
  [key: string]: number | boolean | string | string[] | undefined;
};

export type Table2Params = {
  skip?: number;
  take?: number;
  order?: string;
  search?: string;
  sort?: string;
  [key: string]: number | boolean | string | string[] | undefined;
};

export interface PaginationResponseNetType<T> {
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

export type Callback = (..._args: any[]) => void;
