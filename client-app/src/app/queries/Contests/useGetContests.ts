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
import { Contest } from ".";
import { getContests } from "./apis";

export function useGetContests(
  options?: UseQueryOptions<PaginationResponseNetType<Contest>, Error> & {
    [key: string]: string | number | string[] | boolean;
  }
) {
  const [params, setParams] = useState<Table2Params>({});
  const {
    error,
    data,
    isFetching,
    refetch: onGetContests,
  } = useQuery<PaginationResponseNetType<Contest>, Error>({
    queryKey: [API_QUERIES.GET_CONTESTS, params],
    queryFn: (query) => {
      const [, ...params] = query.queryKey;
      return responseWrapper<PaginationResponseNetType<Contest>>(
        getContests,
        params
      );
    },

    notifyOnChangeProps: ["data", "isFetching"],
    enabled: !isEmpty(params),
    ...options,
  });

  const queryClient = useQueryClient();

  const handleInvalidateContests = () =>
    queryClient.invalidateQueries({
      queryKey: [API_QUERIES.GET_CONTESTS],
    });

  const { data: contests = [], pageSize, totalCount, succeeded } = data || {};

  return {
    contests,
    payloadSize: pageSize,
    totalRecords: totalCount,
    error,
    isFetching,
    succeeded,
    params,
    onGetContests,
    setParams,
    handleInvalidateContests,
  };
}
