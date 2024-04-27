/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-debugger */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { UseQueryOptions, useQuery, useQueryClient } from "@tanstack/react-query";
import { DifficultyStatistic,  ProblemStatistic } from "./types";
import { API_QUERIES } from "../common/constants";
import { getProblemStatisticById } from "./apis";
import { responseWrapper } from "../common";
import { ApiResponseType } from "../../shared";

export function useGetProblemStatisticChartById(
  options?: UseQueryOptions<ApiResponseType<ProblemStatistic<DifficultyStatistic>>, Error, any> & {
    id?: string;
  }
) {
  const {
    data,
    error,
    isError,
    isFetching,
    refetch: onGetProblemStatisticSubmission,
  } = useQuery<ApiResponseType<ProblemStatistic<DifficultyStatistic>>, Error, any>({
    queryKey: [API_QUERIES.GET_PROBLEMS_CHART_BY_ID, { id: options?.id }],
    queryFn: (query) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars

      const [_, ...params] = query.queryKey;
      return responseWrapper<ApiResponseType<ProblemStatistic<DifficultyStatistic>>>(getProblemStatisticById, params);
    },
    enabled: true,
    ...options,
  });

  const queryClient = useQueryClient();

  const handleInvalidateProfile = () =>
    queryClient.invalidateQueries({queryKey: [API_QUERIES.GET_PROBLEMS_CHART_BY_ID]});

  const {data: problemStatistic = []} = data || [];

  return {
    problemStatistic,
    error,
    isError,
    isFetching,
    onGetProblemStatisticSubmission,
    handleInvalidateProfile,
  };
}
