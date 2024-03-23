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
import { getRegisteredContests } from "./apis";

export function useGetRegisteredContest(
  options?: UseQueryOptions<PaginationResponseNetType<Contest>, Error> & {
    [key: string]: string | number | string[] | boolean;
  }
) {
  const [params, setParams] = useState<Table2Params>({});
  const {
    error,
    data,
    isFetching,
    refetch: onGetRegisteredContests,
  } = useQuery<PaginationResponseNetType<Contest>, Error>({
    queryKey: [API_QUERIES.GET_REGISTERED_CONTEST, params],
    queryFn: (query) => {
      const [, ...params] = query.queryKey;
      return responseWrapper<PaginationResponseNetType<Contest>>(
        getRegisteredContests,
        params
      );
    },

    notifyOnChangeProps: ["data", "isFetching"],
    enabled: !isEmpty(params),
    ...options,
  });

  const queryClient = useQueryClient();

  const handleInvalidateRegisteredContest = () =>
    queryClient.invalidateQueries({ queryKey: [API_QUERIES.GET_REGISTERED_CONTEST] });

  const { data: registeredContests = [], pageSize, totalCount, succeeded } = data || {};

  return {
    registeredContests,
    payloadSize: pageSize,
    totalRecords: totalCount,
    error,
    isFetching,
    succeeded,
    params,
    onGetRegisteredContests,
    setParams,
    handleInvalidateRegisteredContest,
  };
}
