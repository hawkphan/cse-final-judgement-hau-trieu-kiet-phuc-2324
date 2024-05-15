/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-debugger */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { UseQueryOptions, useQuery, useQueryClient } from "@tanstack/react-query";
import { OverallStatistic } from "./types";
import { API_QUERIES } from "../common/constants";
import { responseWrapper } from "../common";
import { ApiResponseType } from "../../shared";
import { getOverallStatistic } from "./api";

export function useGetOverallStatistic(
  options?: UseQueryOptions<ApiResponseType<OverallStatistic[]>, Error, any> & {
    id?: string;
  }
) {
  const {
    data,
    error,
    isError,
    isFetching,
    refetch: onGetOverallStatistic,
  } = useQuery<ApiResponseType<OverallStatistic[]>, Error, any>({
    queryKey: [API_QUERIES.GET_OVERALL_STATISTIC],
    queryFn: (query) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars

      const [_, ...params] = query.queryKey;
      return responseWrapper<ApiResponseType<OverallStatistic[]>>(getOverallStatistic, params);
    },
    enabled: true,
    ...options,
  });

  const queryClient = useQueryClient();

  const handleInvalidateOverallStatistic = () =>
    queryClient.invalidateQueries({queryKey: [API_QUERIES.GET_OVERALL_STATISTIC]});

  const {data: overallStatistic = []} = data || [];

  return {
    overallStatistic,
    error,
    isError,
    isFetching,
    onGetOverallStatistic,
    handleInvalidateOverallStatistic,
  };
}
