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
  import { getUnregisteredContests } from "./apis";
  
  export function useGetUnregisteredContest(
    options?: UseQueryOptions<PaginationResponseNetType<Contest>, Error> & {
      [key: string]: string | number | string[] | boolean;
    }
  ) {
    const [params, setParams] = useState<Table2Params>({});
    const {
      error,
      data,
      isFetching,
      refetch: onGetUnregisteredContests,
    } = useQuery<PaginationResponseNetType<Contest>, Error>({
      queryKey: [API_QUERIES.GET_UNREGISTERED_CONTEST, params],
      queryFn: (query) => {
        const [, ...params] = query.queryKey;
        return responseWrapper<PaginationResponseNetType<Contest>>(
          getUnregisteredContests,
          params
        );
      },
  
      notifyOnChangeProps: ["data", "isFetching"],
      enabled: !isEmpty(params),
      ...options,
    });
  
    const queryClient = useQueryClient();
  
    const handleInvalidateUnregisteredContest = () =>
      queryClient.invalidateQueries({ queryKey: [API_QUERIES.GET_UNREGISTERED_CONTEST] });
  
    const { data: unregisteredContests = [], pageSize, totalCount, succeeded } = data || {};
  
    return {
      unregisteredContests,
      payloadSize: pageSize,
      totalRecords: totalCount,
      error,
      isFetching,
      succeeded,
      params,
      onGetUnregisteredContests,
      setParams,
      handleInvalidateUnregisteredContest,
    };
  }
  