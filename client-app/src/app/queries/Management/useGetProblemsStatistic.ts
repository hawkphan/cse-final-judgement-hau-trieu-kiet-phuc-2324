/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-debugger */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { UseQueryOptions, useQuery, useQueryClient } from "@tanstack/react-query";
import { DataStatistic } from "./types";
import { API_QUERIES } from "../common/constants";
import { responseWrapper } from "../common";
import { ApiResponseType } from "../../shared";
import { getProblemsStatistic } from "./api";

export function useGetProblemsStatistic(
  options?: UseQueryOptions<ApiResponseType<DataStatistic>, Error, any> & {
    date: string;
  }
) {
  const {
    data,
    error,
    isError,
    isFetching,
    refetch: onGetProblemsStatistic,
  } = useQuery<ApiResponseType<DataStatistic>, Error, any>({
    queryKey: [API_QUERIES.GET_PROBLEMS_STATISTIC, { date: options?.date }],
    queryFn: (query) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [_, ...params] = query.queryKey;
      return responseWrapper<ApiResponseType<DataStatistic>>(getProblemsStatistic, params);
    },
    enabled: true,
    ...options,
  });

  const queryClient = useQueryClient();

  const handleInvalidateProblemsStatistic = () =>
    queryClient.invalidateQueries({queryKey: [API_QUERIES.GET_PROBLEMS_STATISTIC]});

  const {data: problemsStatistic = []} = data || [];

  return {
    problemsStatistic,
    error,
    isError,
    isFetching,
    onGetProblemsStatistic,
    handleInvalidateProblemsStatistic,
  };
}
