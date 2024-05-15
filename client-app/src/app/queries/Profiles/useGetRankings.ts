/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-debugger */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { UseQueryOptions, useQuery, useQueryClient } from "@tanstack/react-query";
import {  Ranking } from "./types";
import { API_QUERIES } from "../common/constants";
import { getRankings } from "./apis";
import { responseWrapper } from "../common";
import { ApiResponseType } from "../../shared";

export function useGetRankings(
  options?: UseQueryOptions<ApiResponseType<Ranking[]>, Error, any> & {
    id?: string;
  }
) {
  const {
    data,
    error,
    isError,
    isFetching,
    refetch: onGetRankings,
  } = useQuery<ApiResponseType<Ranking[]>, Error, any>({
    queryKey: [API_QUERIES.GET_RANKING, { id: options?.id }],
    queryFn: (query) => {
      const [_, ...params] = query.queryKey;
      return responseWrapper<ApiResponseType<Ranking[]>>(getRankings, params);
    },
    enabled: true,
    ...options,
  });

  const queryClient = useQueryClient();

  const handleInvalidateRankings = () =>
    queryClient.invalidateQueries({queryKey: [API_QUERIES.GET_RANKING]});

  const {data: rankings = [],totalCount} = data || [];

  return {
    rankings,
    error,
    isError,
    totalCount,
    isFetching,
    onGetRankings,
    handleInvalidateRankings,
  };
}
