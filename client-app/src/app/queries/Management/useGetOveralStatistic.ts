/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-debugger */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { UseQueryOptions, useQuery, useQueryClient } from "@tanstack/react-query";
import { OveralStatistic } from "./types";
import { API_QUERIES } from "../common/constants";
import { responseWrapper } from "../common";
import { ApiResponseType } from "../../shared";
import { getOveralStatistic } from "./api";

export function useGetOveralStatistic(
  options?: UseQueryOptions<ApiResponseType<OveralStatistic[]>, Error, any> & {
    id?: string;
  }
) {
  const {
    data,
    error,
    isError,
    isFetching,
    refetch: onGetOveralStatistic,
  } = useQuery<ApiResponseType<OveralStatistic[]>, Error, any>({
    queryKey: [API_QUERIES.GET_OVERAL_STATISTIC],
    queryFn: (query) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars

      const [_, ...params] = query.queryKey;
      return responseWrapper<ApiResponseType<OveralStatistic[]>>(getOveralStatistic, params);
    },
    enabled: true,
    ...options,
  });

  const queryClient = useQueryClient();

  const handleInvalidateOveralStatistic = () =>
    queryClient.invalidateQueries({queryKey: [API_QUERIES.GET_OVERAL_STATISTIC]});

  const {data: overalStatistic = []} = data || [];

  return {
    overalStatistic,
    error,
    isError,
    isFetching,
    onGetOveralStatistic,
    handleInvalidateOveralStatistic,
  };
}
