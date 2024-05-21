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
import { API_QUERIES, Table2Params } from "../common";
import { getRankings } from "./apis";
import { Ranking } from "./types";

export function useGetRankings(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options?: UseQueryOptions<PaginationResponseNetType<Ranking>, Error> & {
    [key: string]: string | number | string[] | boolean;
  }
) {
  const [params, setParams] = useState<Table2Params>({});
  const {
    error,
    data,
    isFetching,
    refetch: onGetRankings,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } = useQuery<PaginationResponseNetType<Ranking>, Error>({
    queryKey: [API_QUERIES.GET_RANKING, params],
    queryFn: (query) => {
      const [, ...params] = query.queryKey;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return responseWrapper<PaginationResponseNetType<Ranking>>(
        getRankings,
        params
      );
    },

    notifyOnChangeProps: ["data", "isFetching"],
    enabled: !isEmpty(params),
    ...options,
  });

  const queryClient = useQueryClient();

  const handleInvalidateRankings = () =>
    queryClient.invalidateQueries({ queryKey: [API_QUERIES.GET_RANKING] });

  const { data: rankings = [], pageSize, totalCount, succeeded } = data || {};

  return {
    rankings,
    payloadSize: pageSize,
    totalRecords: totalCount,
    error,
    isFetching,
    succeeded,
    params,
    onGetRankings,
    setParams,
    handleInvalidateRankings,
  };
}
