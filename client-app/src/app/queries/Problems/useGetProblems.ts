import {
  UseQueryOptions,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useState } from "react";
import { PaginationResponseNetType, responseWrapper } from "../../shared";
import { Problem } from "./types";
import { TableParamsNet } from "../common/types";
import { API_QUERIES } from "../common/constants";
import { getProblems } from "./problemApis";

export function useGetProblems(
  options?: UseQueryOptions<PaginationResponseNetType<Problem>, Error> & {
    [key: string]: string | number | string[];
  }
) {
  const [params, setParams] = useState<TableParamsNet>({});

  const {
    data,
    error,
    isFetching,
    refetch: onGetNestedChargeCode,
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
    enabled: !!params,
    staleTime: 0,
    ...options,
  });

  const queryClient = useQueryClient();

  const handleInvalidateNestedChargeCode = () =>
    queryClient.invalidateQueries({ queryKey: [API_QUERIES.GET_PROBLEMS] });

  const { data: problems, pageSize, totalCount, succeeded } = data || {};
  
  return {
    problems,
    payloadSize: pageSize,
    totalRecords: totalCount,
    error,
    isFetching,
    succeeded,
    params,
    onGetNestedChargeCode,
    setParams,
    handleInvalidateNestedChargeCode,
  };
}
