import {
  UseQueryOptions,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useState } from "react";
import {
  PaginationResponseNetType,
  isEmpty,
  responseWrapper,
} from "../../shared";
import { API_QUERIES } from "../common/constants";

import { Table2Params } from "../common/types";
import { Result } from "./types";
import { getResults } from "./apis";

export function useGetResults(
  options?: UseQueryOptions<PaginationResponseNetType<Result>, Error> & {
    [key: string]: string | number | string[] | boolean;
  }
) {
  const [params, setParams] = useState<Table2Params>({});
  const {
    error,
    data,
    isFetching,
    refetch: onGetResults,
  } = useQuery<PaginationResponseNetType<Result>, Error>({
    queryKey: [API_QUERIES.GET_RESULTS, params],
    queryFn: (query) => {
      const [, ...params] = query.queryKey;
      return responseWrapper<PaginationResponseNetType<Result>>(
        getResults,
        params
      );
    },

    notifyOnChangeProps: ["data", "isFetching"],
    enabled: !isEmpty(params),
    ...options,
  });

  const queryClient = useQueryClient();

  const handleInvalidateResults = () =>
    queryClient.invalidateQueries({ queryKey: [API_QUERIES.GET_RESULTS] });

  const { data: results = [], pageSize, totalCount, succeeded } = data || {};

  return {
    results,
    payloadSize: pageSize,
    totalRecords: totalCount,
    error,
    isFetching,
    succeeded,
    params,
    onGetResults,
    setParams,
    handleInvalidateResults,
  };
}
