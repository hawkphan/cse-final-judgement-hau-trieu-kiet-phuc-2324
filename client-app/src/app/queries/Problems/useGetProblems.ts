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
import { Problem } from "./types";
import { API_QUERIES } from "../common/constants";
import { getProblems } from "./problemApis";
import { Table2Params } from "../common/types";

export function useGetProblems(
  options?: UseQueryOptions<PaginationResponseNetType<Problem>, Error> & {
    [key: string]: string | number | string[];
  }
) {
  const [params, setParams] = useState<Table2Params>({});
  const {
    error,
    data,
    isFetching,
    refetch: onGetProblems,
  } = useQuery<PaginationResponseNetType<Problem>, Error>({
    queryKey: [API_QUERIES.GET_PROBLEMS, params],
    queryFn: (query) => {
      const [, ...params] = query.queryKey;
      return responseWrapper<PaginationResponseNetType<Problem>>(
        getProblems,
        params
      );
    },

    notifyOnChangeProps: ["data", "isFetching"],
    enabled: !isEmpty(params),
    ...options,
  });

  const queryClient = useQueryClient();

  const handleInvalidateProblems = () =>
    queryClient.invalidateQueries({ queryKey: [API_QUERIES.GET_PROBLEMS] });

  const { data: problems = [], pageSize, totalCount, succeeded } = data || {};

  return {
    problems,
    payloadSize: pageSize,
    totalRecords: totalCount,
    error,
    isFetching,
    succeeded,
    params,
    onGetProblems,
    setParams,
    handleInvalidateProblems,
  };
}
