export const API_URL = "http://localhost:5000";

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

export enum API_QUERIES {
  GET_PROBLEMS = "/get-problems",
}
