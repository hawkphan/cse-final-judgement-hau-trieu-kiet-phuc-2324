import {
  UseQueryOptions,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useState } from "react";
import { PaginationResponseNetType, isEmpty, responseWrapper } from "../../shared";
import { API_QUERIES } from "../common/constants";
import { Table2Params } from "../common/types";
import { Solution } from ".";
import { getSolutions } from "./apis";

export function useGetSolutions(
  options?: UseQueryOptions<PaginationResponseNetType<Solution>, Error> & {
    [key: string]: string | number | string[] | boolean;
  }
) {
  const [params, setParams] = useState<Table2Params>({});
  const {
    error,
    data,
    isFetching,
    refetch: onGetSolutions,
  } = useQuery<PaginationResponseNetType<Solution>, Error>({
    queryKey: [API_QUERIES.GET_SOLUTIONS, params],
    queryFn: (query) => {
      const [, ...params] = query.queryKey;
      return responseWrapper<PaginationResponseNetType<Solution>>(
        getSolutions,
        params
      );
    },

    notifyOnChangeProps: ["data", "isFetching"],
    // enabled: !isEmpty(params),
    enabled: !isEmpty(params),
    ...options,
  });

  const queryClient = useQueryClient();

  const handleInvalidateSolutions = () =>
    queryClient.invalidateQueries({ queryKey: [API_QUERIES.GET_SOLUTIONS] });

  const { data: solutions = [], pageSize, totalCount, succeeded } = data || {};

  return {
    solutions,
    payloadSize: pageSize,
    totalRecords: totalCount,
    error,
    isFetching,
    succeeded,
    params,
    onGetSolutions,
    setParams,
    handleInvalidateSolutions,
  };
}
